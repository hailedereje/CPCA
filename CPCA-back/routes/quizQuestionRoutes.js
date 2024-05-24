import express from 'express';
import {
    getAllQuizQuestions,
    getQuizQuestionById,
    createQuizQuestion,
    updateQuizQuestionById,
    deleteQuizQuestionById,
} from '../controllers/index.js';

const router = express.Router();

router.get('/', getAllQuizQuestions);
router.get('/:id', getQuizQuestionById);
router.post('/', createQuizQuestion);
router.put('/:id', updateQuizQuestionById);
router.delete('/:id', deleteQuizQuestionById);

// Export the router
export default router;