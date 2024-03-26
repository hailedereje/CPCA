import express from "express";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "../controllers/index.js";
import multer from "multer";
import {
  fileStorage,
  imageStorage,
  videoStorage,
} from "../config/multerConfig.js";

const upload = multer({
  storage: {
    file: fileStorage,
    image: imageStorage,
    video: videoStorage,
  },
});

console.log(upload);
const router = express.Router();

router.post(
  "/:courseId/lessons",
  upload.fields[
    ({
      name: "Files",
      maxCount: 10,
    },
    {
      name: "Images",
      maxCount: 10,
    })
  ],
  createLesson
);
router.patch("/:courseId/lessons/:lessonId", updateLesson);
router.delete("/:courseId/lessons/:lessonId", deleteLesson);

export default router;
