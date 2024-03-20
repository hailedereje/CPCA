import "express-async-errors";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "../middlewares/index.js";
import { userRoutes, courseRoutes, lessonRoutes } from "../routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const App = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(morgan("dev"));
  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/courses", courseRoutes);
  app.use("/api/v1/courses", lessonRoutes)

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default App;

