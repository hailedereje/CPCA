/* eslint-disable react/prop-types */
const CourseItem = ({ course }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
        <div className="rounded-lg overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
        </div>
      <div className="mt-2">
        <div className="w-full overflow-hidden">
          <h3 className="text-xl font-bold mb-2 whitespace-nowrap overflow-hidden overflow-ellipsis">{course.title}</h3>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src={course.profileImage} alt={course.instructor} className="w-12 h-12 rounded-full mr-2" />
            <p className="text-gray-800 font-bold">{course.instructor}</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enroll
           </button>
        </div>
        <p className="text-gray-600 mb-2 overflow-hidden overflow-ellipsis line-clamp-2">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseItem;

