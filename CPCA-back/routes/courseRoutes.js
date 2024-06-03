import express from "express";
import { authenticate, isAdmin, isInstructor, studentCheck } from "../middlewares/authenticate.js";

import {
  deleteCourse,
  getAllCourses,
  getCourseListFilter,
  updateCourse,
} from "../controllers/index.js";
import { createCourseController } from "../controllers/course/createCourseController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { addPrerequisiteController } from "../controllers/course/addPrerequisiteController.js";
import { addPrerequisiteSchema } from "../validation/course/addPrerequisiteValidator.js";
import { createCourseSchema } from "../validation/course/createCourseValidator.js";
import { getSinglCourseController } from "../controllers/course/getSingleCourseController.js";
import { addTagsSchema } from "../validation/course/addTagsValidator.js";
import { addTagsController } from "../controllers/course/addTagsController.js";
import { addDescriptionSchema } from "../validation/course/addDescriptionvalidator.js";
import { addDescriptionController } from "../controllers/course/addDescriptionController.js";
import { getAllDraftCourses } from "../controllers/course/getAllDraftCourses.js";
import { addObjectiveSchema } from "../validation/course/addObjectiveValidator.js";
import { addObjectiveController } from "../controllers/course/addObjectiveController.js";
import { createChapterSchema } from "../validation/chapter/createChapterValidation.js";
import { createChapterController } from "../controllers/chapter/createChapterController.js";
import { getChaptersController } from "../controllers/chapter/getAllChaptersController.js";
import { renameChapterController } from "../controllers/chapter/renameChapterController.js";
import { createLessonSchema } from "../validation/lesson/createLessonValidation.js";
import { createLessonController } from "../controllers/lesson/createLessonController.js";
import { getLessonController } from "../controllers/lesson/getLessonController.js";
import { addLessonItemSchema } from "../validation/lesson/addLessonItemValidator.js";
import { addLessonItemController } from "../controllers/lesson/addLessonItemController.js";
import { deleteLessonItemController } from "../controllers/lesson/deleteLessonItemController.js";
import { updateLessonItemController } from "../controllers/lesson/updateLessonItemController.js";
import { deleteLessonController } from "../controllers/lesson/deleteLessonController.js";
import { deletChapterController } from "../controllers/chapter/deleteChapterController.js";
import { uploadImageController } from "../controllers/course/uploadImageController.js";
import { createLab, deleteLab, getLab, getLabs, updateLab } from "../controllers/lab/labController.js";
import { labValidationSchema } from "../validation/lab/labValidator.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getAllCourses);
router.use(isAdmin);
router.get("/all",getAllCourses)
router.get("/all/drafts",getAllDraftCourses)
router.get("/courseListFilter",getCourseListFilter)
router.post("/new",validateRequest(createCourseSchema), createCourseController);
router.post("/course/add-prerequisites",validateRequest(addPrerequisiteSchema),addPrerequisiteController)
router.post("/course/add-tags",validateRequest(addTagsSchema),addTagsController)
router.post("/course/add-description",validateRequest(addDescriptionSchema),addDescriptionController)
router.post("/course/add-objective",validateRequest(addObjectiveSchema),addObjectiveController)
router.post("/course/add-chapter",validateRequest(createChapterSchema),createChapterController)
router.get("/course",getSinglCourseController)
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/course/chapters/chapter/upload-image",uploadImageController)

// chapter
router.get("/course/chapters",getChaptersController)
router.get("/course/chapters/chapter")
router.post("/course/chapters",createChapterController)
router.post("/course/chapters/chapter/rename",renameChapterController)
router.delete("/course/chapters/chapter",deletChapterController)

//lesson
router.get("/course/chapters/chapter/lessons/lesson",getLessonController)
router.post("/course/chapters/chapter/lessons",validateRequest(createLessonSchema),createLessonController)
router.delete("/course/chapters/chapter/lessons/lesson",deleteLessonController)

//lesson item
router.post("/course/chapters/chapter/lessons/lesson/add-lesson-item",validateRequest(addLessonItemSchema),addLessonItemController)
router.post("/course/chapters/chapter/lessons/lesson/update-lesson-item",updateLessonItemController)
router.delete("/course/chapters/chapter/lessons/:lessonId/delete-lesson-item/:lessonItemId",deleteLessonItemController)

// lab
router.post("/course/labs",validateRequest(labValidationSchema),createLab)
router.get("/course/labs/:courseId",getLabs)
router.get("/course/labs/lab/:labId",getLab)
router.put("/course/labs/lab/:labId", validateRequest(labValidationSchema),updateLab)
router.delete("/course/labs/lab/:labId",deleteLab)
export default router;
