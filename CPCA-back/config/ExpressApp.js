import "express-async-errors";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "../middlewares/index.js";
import { userRoutes, courseRoutes, lessonRoutes, questionRoutes } from "../routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const App = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: function (origin, callback) {
      callback(null, origin);
    }, 
    credentials: true
  }));
  app.use(morgan("dev"));
  app.get("/", (req, res) => {
    res.send("server running ...");
  });
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/courses", courseRoutes);
  app.use("/api/v1/courses", lessonRoutes);
  app.use("/api/v1/discussion", questionRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default App;

