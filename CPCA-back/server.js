import express from "express";
import { connectToDB, createAdminUsers } from "./config/Database.js";
import dotenv from "dotenv";
import App from "./config/ExpressApp.js";
import { socketConnection } from "./config/socket.js";
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
  // I moved the socket content to this file ok 
  await socketConnection(server)
};

startServer();
