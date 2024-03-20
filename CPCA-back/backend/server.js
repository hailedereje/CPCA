import express from "express";
import { connectToDB, createAdminUsers } from "./config/Database.js";
import dotenv from "dotenv";
import App from "./config/ExpressApp.js";
dotenv.config();

const port = process.env.PORT || 3000;
const startServer = async () => {
  const app = express();
  await connectToDB();
  if (process.env.CREATE_ADMINS === "true") {
    await createAdminUsers(); // Call the function to create admin users
  }

  await App(app);

  app.listen(port, () => {
    console.log(`app is listenening on port ${port}`);
  });
};

startServer();
