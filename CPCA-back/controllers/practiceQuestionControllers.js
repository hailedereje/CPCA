import { PracticeQuestion } from "../models/index.js";

// Create a new practiceQuestion
export const createPracticeQuestion = async (req, res) => {
    try {
        const practiceQuestion = new PracticeQuestion(req.body);
        await practiceQuestion.save();
        res.status(201).json(practiceQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create practiceQuestion' });
    }
};

// Update an existing practiceQuestion
export const updatePracticeQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const practiceQuestion = await PracticeQuestion.findByIdAndUpdate(id, req.body, { new: true });
        if (!practiceQuestion) {
            return res.status(404).json({ error: 'PracticeQuestion not found' });
        }
        res.json(practiceQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update practiceQuestion' });
    }
};

// Get a specific practiceQuestion by ID
export const getAllPracticeQuestions = async (req, res) => {
    try {
        const practiceQuestion = await PracticeQuestion.find({});
        res.json(practiceQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get practiceQuestion' });
    }
};

// Get a specific practiceQuestion by ID
export const getPracticeQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const practiceQuestion = await PracticeQuestion.findById(id);
        if (!practiceQuestion) {
            return res.status(404).json({ error: 'PracticeQuestion not found' });
        }
        res.json(practiceQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get practiceQuestion' });
    }
};

// Delete a practiceQuestion
export const deletePracticeQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const practiceQuestion = await PracticeQuestion.findByIdAndDelete(id);
        if (!practiceQuestion) {
            return res.status(404).json({ error: 'PracticeQuestion not found' });
        }
        res.json({ message: 'PracticeQuestion deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete practiceQuestion' });
    }
};