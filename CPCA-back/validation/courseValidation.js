// CourseValidation.js
import Joi from 'joi';

const courseSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string(),
  author: Joi.string().min(5).max(20).required(),
  level: Joi.string().valid("BEGINER", "INTERMEDIATE", "ADVANCED").required(),
  duration: Joi.number().required(),
  templateImg: Joi.string(),
  objective: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  prerequisites: Joi.array().items(Joi.string())
});

export default courseSchema;
 
