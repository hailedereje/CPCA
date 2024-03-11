import express from "express";
import { connectToDB } from "./config/Database.js";
import dotenv from "dotenv";
import App from "./config/ExpressApp.js";

dotenv.config();
const port = process.env.PORT || 3000;
const startServer = async () => {
  const app = express();
  // await connectToDB();
  await App(app);
  await connectToDB();
  app.listen(port, () => {
    console.log(`app is listenening on port ${port}`);
  });

};

startServer();
