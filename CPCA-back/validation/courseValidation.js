// CourseValidation.js
import Joi from 'joi';

const courseSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().required(),
  author: Joi.string().min(5).max(20).required(),
  level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
  duration: Joi.string().min(5).max(20).required(),
  templateImg: Joi.string().required(),
  objective: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  prerequisites: Joi.array().items(Joi.string()),
  instructor: Joi.string().email().required(),
});

export default courseSchema;
￼
1
 
