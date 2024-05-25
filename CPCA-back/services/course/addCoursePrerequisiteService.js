import Course from "../../models/course.js";

export const addPrerequisiteService = async (courseId, prerequisites) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    prerequisites.forEach(prereq => {
      if (!course.prerequisites.includes(prereq)) {
        course.prerequisites.push(prereq);
      }
    });

    await course.save();
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};
