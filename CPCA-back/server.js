import express from "express";
import { connectToDB, createAdminUsers } from "./config/Database.js";
import dotenv from "dotenv";
import App from "./config/ExpressApp.js";
import { Server } from "socket.io";
dotenv.config();

const port = process.env.PORT || 3000;
const startServer = async () => {
  const app = express();
  await connectToDB();
  if (process.env.CREATE_ADMINS === "true") {
    await createAdminUsers(); // Call the function to create admin users
  }

  await App(app);

  const server = app.listen(5000, () => {
    console.log(`Server running on port ${port}`);
  });
  
  // const io = new Server(server, {
  //   secure: true,
  //   cors: {
  //     origin: "http://localhost:5173",
  //     methods: ["GET", "POST"],
  //     credentials: true,
  //   },
  // });
  
//   io.on("connection", (socket) => {
//     console.log("socket connected");
//     const users = [];
  
//     for (let [id, socket] of io.of("/").sockets) {
//       if (socket.handshake.auth._id)
//         users.push({
//           ...socket.handshake.auth,
//           socketId: socket.handshake.auth._id,
//         });
//     }
  
//     console.log("users", users);
//     io.emit("user-connected", users);
  
//     socket.on("join-room", ({ room, user }) => {
//       users[user._id] = user;
//       socket.join(room);
//       socket.broadcast.to(room).emit("user-connected", users);
//     });
  
//     socket.on("send-message", ({ message, room, user }) => {
//       console.log("message", message, room, user);
//       io.to(room).emit("receive-message", { message, user, room });
//     });
  
//     socket.on("disconnect", () => {
//       console.log("disconnected");
//       const delUser = users.filter(
//         (user) => user.socketId !== socket.handshake.auth._id
//       );
//       console.log("disconnected users", delUser);
//       io.emit("user-disconnected", delUser);
//     });
//   });
};

startServer();
