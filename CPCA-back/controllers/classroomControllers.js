import { Classroom, Invitation, User } from "../models/index.js";
import crypto from "crypto";

// Create a new classroom
export const createClassroom = async (req, res) => {
  try {
    const { name, description, instructorId, courseId } = req.body;
    const classroom = new Classroom({
      name,
      description,
      instructorId,
      courseId,
    });
    const newClassroom = await classroom.save();
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(500).json({ error: "Failed to create classroom" });
  }
};

// get all classrooms
// Get all classrooms by instructorId
export const getClassroomsByInstructorId = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const classrooms = await Classroom.find({ instructorId });
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

// Get all classrooms by studentId
export const getClassroomsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const classrooms = await Classroom.find({ students: userId });
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

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const sendInvitation = async (email) => {
    const token = crypto.randomBytes(20).toString("hex");
    const invitationLink = `${process.env.CLIENT_URL}/join/${token}?classroomId=${classroomId}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Classroom Invitation",
      text: `You are invited to join the classroom. Click here to join: ${invitationLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      await Invitation.create({ email, token, classroomId });
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  };

  await Promise.all(emails.map((email) => sendInvitation(email)));

  res.status(200).json({ message: "Invitations sent" });
};

// Join a classroom
export const joinClassroom = async (req, res) => {
  const { token } = req.params;
  const { classroomId } = req.query;
  const invitation = await Invitation.findOne({ token, classroomId });
  if (!invitation) {
    return res.status(400).json({ error: "Invalid invitation link" });
  }
  const user = await User.findOne({ email: invitation.email });
  if (user) {
    return res.redirect(
      `${process.env.CLIENT_URL}/login?email=${user.email}&token=${token}&classroomId=${classroomId}`
    );
  } else {
    return res.redirect(
      `${process.env.CLIENT_URL}/register?email=${invitation.email}&token=${token}&classroomId=${classroomId}`
    );
  }
};

// enroll a student in a classroom
export const enrollStudent = async (req, res) => {
  const { email, classroomId } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const classroom = await Classroom.findById(classroomId);

  if (!classroom) {
    return res.status(404).json({ error: "Classroom not found" });
  }

  if (classroom.students.includes(user._id)) {
    return res
      .status(400)
      .json({ error: "User already enrolled in this classroom" });
  }

  classroom.students.push(user._id);
  await classroom.save();

  res.status(200).json({ message: "User enrolled successfully" });
};