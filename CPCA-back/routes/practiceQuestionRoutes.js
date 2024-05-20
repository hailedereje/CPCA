import express from 'express';
import { createPracticeQuestion, deletePracticeQuestion, 
    getAllPracticeQuestions, getPracticeQuestion, 
    updatePracticeQuestion } from '../controllers/index.js';

const router = express.Router();

// Define your routes here
router.get('/', getAllPracticeQuestions);
router.get('/:id', getPracticeQuestion);
router.post('/', createPracticeQuestion);
router.put('/:id', updatePracticeQuestion);
router.delete('/:id', deletePracticeQuestion);

export default router;