import  Course  from "../models/course.js";

const isNumber = (value) => typeof value === 'number' && !isNaN(value)

export async function getAllCoursesService({page = 1, name='',level='',tag=''}) {
  try {
    const limit = 20
    var skip = 0
    if(isNumber(parseInt(page))) {
        skip = (parseInt(page) - 1) * limit;
    }
    

    const query = await Course.find();
    // if (searchQuery) {
    //     query = query.find({
    //       $or: [
    //         { name: { $regex: name, $options: 'i' } }, // Case-insensitive search for course name
    //       ]
    //     });
    //   }

      query.skip(skip)
      .limit(limit)
      .populate('chapters')
      .populate('instructor');

    // const courses = await query.exec();
    // const totalCourses = await Course.countDocuments(filters);
    const courses = await Course.find();

    return {
      courses,
    //   totalPages: Math.ceil(totalCourses / limit),
    //   currentPage: page
    };
  } catch (error) {
    throw new Error('Error fetching courses: ' + error.message);
    console.log(error.message)
  }
}

export const createCourseService = async(courseData) => {
    return await Course.create(courseData) 
}
