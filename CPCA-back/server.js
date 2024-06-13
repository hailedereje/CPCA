import express from "express";
import http from "http";
import { connectToDB, createAdminUsers } from "./config/Database.js";
import dotenv from "dotenv";
import App from "./config/ExpressApp.js";
import { socketConnection } from "./config/socket.js";
dotenv.config();

const port = process.env.PORT || 3000;
const startServer = async () => {
  const app = express();
  const server = http.createServer(app);
  await connectToDB();
  if (process.env.CREATE_ADMINS === "true") {
    await createAdminUsers();
  }

  const io = await socketConnection(server)
  app.use((req, res, next) => {
    req.io = io;
    next();
  });
  
  await App(app);
  
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
