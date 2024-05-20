import express from 'express';
import { createPracticeQuestion, deletePracticeQuestion, 
    getAllPracticeQuestions, getPracticeQuestion, 
    updatePracticeQuestion } from '../controllers/index.js';
import { authenticate, isInstructor, studentCheck } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.use(isInstructor);
router.get('/', getAllPracticeQuestions);
router.get('/:id', getPracticeQuestion);
router.post('/', createPracticeQuestion);
router.put('/:id', updatePracticeQuestion);
router.delete('/:id', deletePracticeQuestion);

router.use(studentCheck);
router.get('/', getAllPracticeQuestions);

export default router;