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

// Get a all practiceQuestion
export const getAllPracticeQuestions = async (req, res) => {
    console.log(req.query);
    const { page = 1, search = '', difficulty = '' } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;
  
    const query = {
      title: { $regex: search, $options: 'i' },
      ...(difficulty && { difficulty }),
    };
  
    try {
      const questions = await PracticeQuestion.find(query).skip(skip).limit(limit)
      const totalQuestions = await PracticeQuestion.countDocuments(query);
      const totalPages = Math.ceil(totalQuestions / limit);
  
      res.json({ questions, totalPages });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching questions' });
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