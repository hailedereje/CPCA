import express from 'express';
import { getStudentPerformance } from '../controllers/analytics/studentDataController.js';
import { getCourseEngagement } from '../controllers/analytics/courseEngagmentController.js';
import { getPlatformUsage } from '../controllers/analytics/platformUsageController.js';
import { isAdmin } from '../middlewares/authenticate.js';

export const analyticsRouter = express.Router();

// router.use(authenticate);
analyticsRouter.use(isAdmin);
analyticsRouter.get('/student-data',getStudentPerformance);
analyticsRouter.get('/course-engagement',getCourseEngagement);
analyticsRouter.get('/platform-usage',getPlatformUsage);