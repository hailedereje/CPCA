import { Server } from "socket.io";
import { Classroom, DiscussionQuestion, Notification } from "../models/index.js";

export const socketConnection = async (server) => {
  const io = new Server(server, {
    secure: true,
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const rooms = {};

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", ({ roomId, user }) => {
      socket.join(roomId);
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }
      rooms[roomId].push({ socketId: socket.id, ...user });
      io.to(roomId).emit("roomUpdate", rooms[roomId]);
      console.log("connected-users", rooms[roomId]);
      console.log(`User ${user.username} joined room: ${roomId}`);
    });

    socket.on("send-question", async ({ question, roomId }) => {
      socket.to(roomId).emit("receive-question", { question });
      console.log(`Question ${question} sent in room: ${roomId}`);

      const classroom = await Classroom.findById(roomId);
      console.log("classroom", classroom)
      const students = classroom.students;
      const joinedUsers = rooms[roomId] || [];
      const studentsToNotify = students.filter(student => 
        !joinedUsers.map(user => user._id.toString()).includes(student.toString()));
      studentsToNotify.forEach(async (student) => {
        const notification = new Notification({
          message: `New question in ${classroom.name}: ${question.description}`,
          classroom: classroom._id,
          user: student._id,
        });
        await notification.save();
      });
    });

    socket.on('send-answer', async ({ questionId, newAnswer, roomId }) => {
      console.log(`Answer received from ${newAnswer.author.username}`, newAnswer.reply);
      socket.to(roomId).emit('receive-answer', { questionId, newAnswer });

      const classroom = await Classroom.findById(roomId);
      const question = await DiscussionQuestion.findById(questionId);
      const student = question.author;
      const joinedUsers = rooms[roomId] || [];
      if (!joinedUsers.map(user => user._id.toString()).includes(student.toString())) {
        const notification = new Notification({
          message: `New reply in ${classroom.name}: ${newAnswer.reply}`,
          classroom: classroom._id,
          user: student._id,
        });
        await notification.save();
      }
    });

    socket.on("leaveRoom", ({ roomId, user }) => {
      socket.leave(roomId);
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter(
          (user) => user.socketId !== socket.id
        );
        console.log("users-left", rooms[roomId]);
        io.to(roomId).emit("roomUpdate", rooms[roomId]);
      }

      console.log(`User ${user.username} left room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      Object.keys(rooms).forEach((roomId) => {
        const index = rooms[roomId].findIndex(
          (user) => user.socketId === socket.id
        );
        if (index !== -1) {
          rooms[roomId].splice(index, 1);
          io.to(roomId).emit("roomUpdate", rooms[roomId]);
        }
      });
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
