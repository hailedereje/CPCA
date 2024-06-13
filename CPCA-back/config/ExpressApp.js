import "express-async-errors";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "../middlewares/index.js";
import { userRoutes, courseRoutes, lessonRoutes, 
  quizRoutes, practiceQuestionRoutes, 
  quizQuestionRoutes,
  discussionQuestionRoutes,
  progressRoutes,
  classroomRoutes,
  notificationRoutes} from "../routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { analyticsRouter } from "../routes/analyticsRoutes.js";

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
    res.send("server running successfully ...");
  });
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/courses", courseRoutes);
  app.use("/api/v1/courses", lessonRoutes);
  app.use("/api/v1/discussion", discussionQuestionRoutes);
  app.use("/api/v1/quiz", quizRoutes)
  app.use("/api/v1/quiz_question", quizQuestionRoutes)
  app.use("/api/v1/practice_question", practiceQuestionRoutes)
  app.use("/api/v1/progress", progressRoutes)
  app.use("/api/v1/classroom", classroomRoutes)
  app.use("/api/v1/notifications", notificationRoutes)
  app.use("/api/v1/analytics",analyticsRouter)
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default App;

