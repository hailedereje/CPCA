import { Classroom, Discussion, Invitation, User } from "../models/index.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Create a new classroom
export const createClassroom = async (req, res) => {
  try {
    const { name, description, courseId } = req.body;
    const classroom = new Classroom({
      name,
      description,
      instructorId: req.user._id,
      courseId,
    });

    const newClassroom = await classroom.save();
    await Discussion.create({ classroomId: newClassroom._id });
    res.status(201).json(newClassroom);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create classroom" });
  }
};

// Get all classrooms by instruc6658d50970ef68ebbd316285torId
export const getClassroomsByInstructorId = async (req, res) => {
  try {
    const { id } = req.params;
    const classrooms = await Classroom.find({ instructorId: id });
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

// get classroom by id
export const getClassroomById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);  
  const classroom = await Classroom.findById(id).populate( "students");

  if (!classroom) {
    throw new NotFoundError("classroom not found");
  }
  res.status(200).json(classroom);
};

// Get all classrooms by studentId
export const getClassroomsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const classrooms = await Classroom.find({ students: id });
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

// Archive a classroom
export const archiveClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const archivedClassroom = await Classroom.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true }
    );
    if (!archivedClassroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }
    res.status(200).json(archivedClassroom);
  } catch (error) {
    res.status(500).json({ error: "Failed to archive classroom" });
  }
};

// Delete a classroom
export const deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    await Classroom.findByIdAndDelete(id);
    res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete classroom" });
  }
};

// Invite users to a classroom
export const inviteStudents = async (req, res) => {
  const { emails, classroomId } = req.body;
  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: "Invalid email list" });
  }
  console.log("password", process.env.PASSWORD);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const sendInvitation = async (email) => {
    const token = crypto.randomBytes(20).toString("hex");
    const invitationLink = `${process.env.CLIENT_URL}/join/${token}`;
    const mailOptions = {
      from: "Computer Programmming Course Assistant",
      to: email,
      subject: "Classroom Invitation",
      text: `You are invited to join the classroom. Click here to join: ${invitationLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      await Invitation.create({ email, token, classroomId });
    } catch (error) {
      console.log("error", error);
      // res.status(400).json({message: `Failed to send email to ${email}`});
    }
  };

  await Promise.all(emails.map((email) => sendInvitation(email)));

  res.status(200).json({ message: "Invitations sent" });
};

// Get invitation by token
export const getInvitationByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const invitation = await Invitation.findOne({ token });
    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }
    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invitation" });
  }
};

// Join a classroom
export const joinClassroom = async (req, res) => {
  const { token } = req.params;
  const invitation = await Invitation.findOne({ token: token });
  console.log("invitation", invitation);
  if (!invitation) {
    return res.status(400).json({ message: "Invalid invitation link" });
  }
  const id = invitation.classroomId;
  const classroom = await Classroom.findById(id);
  console.log("classroom", classroom);
  if (!classroom) {
    throw new NotFoundError("classroom not found ");
  }

  const user = await User.findOne({ email: invitation.email });
  console.log("user", user);
  if (!user) {
    throw new NotFoundError("User not found");
  }
};

// get discussion by classroomId
export const getDiscussionByClassroomId = async (req, res) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findOne({ classroomId: id }).populate({
      path: "discussion",
      model: "DiscussionQuestion",
      populate: [
        {
          path: "replies",
          populate: {
            path: "author",
            model: "User",
          },
        },
        {
          path: "author",
        },
      ],
      options: { sort: { createdAt: 1 } },
    });

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    return res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch discussion" });
  }
};

// Get my questions by classroomId
export const getMyQuestionsByClassroomId = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findOne({
      classroomId: id,
    }).populate({
      path: "discussion",
      model: "DiscussionQuestion",
      match: { author: req.user._id },
      populate: [
        {
          path: "replies",
          populate: {
            path: "author",
            model: "User",
          },
        },
        {
          path: "author",
        },
      ],
      options: { sort: { createdAt: 1 } },
    });
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};
