import express from 'express';
import {
    getAllQuizQuestions,
    getQuizQuestionById,
    createQuizQuestion,
    updateQuizQuestionById,
    deleteQuizQuestionById,
} from '../controllers/index.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { questionValidation } from '../validation/quiz/createQuizQuestion.js';

const router = express.Router();

router.get('/', getAllQuizQuestions);
router.get('/:id', getQuizQuestionById);
router.post('/',validateRequest(questionValidation), createQuizQuestion);
router.put('/:id',validateRequest(questionValidation), updateQuizQuestionById);
router.delete('/:id', deleteQuizQuestionById);

// Export the router
export default router;