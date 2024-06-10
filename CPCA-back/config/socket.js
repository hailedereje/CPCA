import { Server } from "socket.io";

export const socketConnection = async(server) => {
    const io = new Server(server, {
        secure: true,
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"],
          credentials: true,
        },
      });
    
      let userRooms = {};
      
      io.on("connection", (socket) => {
        console.log("socket connected", socket.id);
        const users = [];
      
        for (let [id, socket] of io.of("/").sockets) {
          if (socket.handshake.auth._id)
            users.push({
              ...socket.handshake.auth,
              socketId: socket.id,
            });
        }
    
        console.log("connected-users", users);
        io.emit('user-connected', users)
      
        socket.on("join-room", ({ room, user }) => {
          socket.join(room);
          socket.broadcast.to(room).emit("user-joined", user);
          userRooms[socket.id] = room;
          console.log("user-rooms", userRooms);
        });
      
        socket.on("send-question", ({ question, room, user }) => {
          console.log("question", question, room, user);
          socket.broadcast.to(room).emit("receive-question", { question, user, room });
        });
    
        socket.on('send-notification', ({ notification, userId }) => {
          // Send the notification to the specified user
          socket.to(userId).emit('receive-notification', notification);
        });
      
        socket.on("disconnect", () => {
          console.log("disconnected");
          const delUser = users.filter(
            (user) => user.socketId !== socket.handshake.auth._id
          );
          console.log("disconnected users", delUser);
          io.emit("user-disconnected", delUser);
        });
      });

      return io;
}