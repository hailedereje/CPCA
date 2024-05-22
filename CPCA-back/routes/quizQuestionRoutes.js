import express from 'express';
import {
    getAllQuizQuestions,
    getQuizQuestionById,
    createQuizQuestion,
    updateQuizQuestion,
    deleteQuizQuestion,
} from '../controllers/quizQuestionController.js';

const router = express.Router();

router.get('/', getAllQuizQuestions);
router.get('/:id', getQuizQuestionById);
router.post('/', createQuizQuestion);
router.put('/:id', updateQuizQuestion);
router.delete('/:id', deleteQuizQuestion);

// Export the router
export default router;