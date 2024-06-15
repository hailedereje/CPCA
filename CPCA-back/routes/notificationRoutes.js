import express from 'express';
import { deleteNotification, getNotificationByUserId, readAllNotifications, readNotification } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();

router.use(authenticate)
router.get('/', getNotificationByUserId);
router.put('/:id', readNotification);
router.delete('/:id', deleteNotification);
router.post('/read-all', readAllNotifications)

export default router;