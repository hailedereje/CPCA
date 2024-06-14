import { Server } from "socket.io";

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

    socket.on("send-question", ({ question, roomId }) => {
      socket.to(roomId).emit("receive-question", { question });
      console.log(`Question ${question} sent in room: ${roomId}`);
    });

  socket.on('send-answer', ({ questionId, newAnswer, roomId }) => {
    console.log(`Answer received from ${newAnswer.author.username}`, newAnswer.reply);
    socket.to(roomId).emit('receive-answer', { questionId, newAnswer });
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
