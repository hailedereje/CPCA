import { RiEdit2Line, RiCheckLine } from 'react-icons/ri'; // Icons for editing and done status
import { useNavigate } from 'react-router-dom';
import { Loading } from './components/loader';
import { useCourses } from './hooks/course-hooks';
import DefaultImage from '@/assets/coursePlaceholder.jpg'; // Path to your default image
import { useState } from 'react';

export const Courses = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const navigate = useNavigate();

  const { data: allCourses, isLoading, isError } = useCourses();

  const filterCourses = (status) => {
    if (!allCourses || !allCourses.data) return [];
    switch (status) {
      case 'all':
        return allCourses.data;
      case 'published':
        return allCourses.data.filter((course) => course.isPublished === true);
      case 'draft':
        return allCourses.data.filter((course) => course.isPublished === false);
      default:
        return [];
    }
  };

  const renderCourses = (courses) => {
    return courses.length ? (
      courses.map((course) => (
        <div
          key={course._id}
          onClick={() => navigate(`/dashboard/course/update/${course._id}`)}
          className="relative bg-white p-4 rounded-xl shadow-sm border transform hover:-translate-y-1 hover:shadow-md transition-transform duration-300 cursor-pointer"
        >
          <div className="w-full h-40 bg-gray-100 rounded-t-md overflow-hidden">
            <img src={course.templateImg || DefaultImage} alt={course.title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold capitalize text-gray-800">
              {course.title}
            </h2>
            <div className="mt-2 flex items-center text-gray-600 text-xs">
              {course.isPublished ? (
                <RiCheckLine size={16} className="text-green-700 mr-1" />
              ) : (
                <RiEdit2Line size={16} className="text-blue-700 mr-1" />
              )}
              <span>Click to edit</span>
            </div>
            <div className="absolute bottom-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                {course.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center col-span-full text-gray-400 text-sm">No courses available.</div>
    );
  };

  const renderContent = () => {
    if (isError) {
      return (
        <div className="text-red-500 text-center mt-8 fixed inset-0 h-full flex items-center justify-center">
          <span className='text-xl font-bold capitalize'>Error Loading Courses...</span>
        </div>
      );
    }

    if (isLoading) {
      return <Loading />;
    }

    const filteredCourses = filterCourses(selectedTab);
    return renderCourses(filteredCourses);
  };

  return (
    <div className="flex flex-col w-full h-fit p-4 gap-4">
      <div className="flex w-full items-center justify-between">
        <div/>
        <h1 className="text-3xl leading-relaxed font-bold text-gray-800">Courses</h1>
        <button onClick={() => navigate('/dashboard/course/create')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 justify-self-end">
          Create Course
        </button>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setSelectedTab('all')} className={`xxs:text-sm md:text-lg px-4 py-2 ${selectedTab === 'all' ? 'text-blue-600 border-blue-700 border-b-2' : 'text-blue-400'}`}>
          All Courses
        </button>
        <button onClick={() => setSelectedTab('published')} className={`xxs:text-sm md:text-lg px-4 py-2 ${selectedTab === 'published' ? 'text-blue-600 border-blue-700 border-b-2' : 'text-blue-400'}`}>
          Published Courses
        </button>
        <button onClick={() => setSelectedTab('draft')} className={`xxs:text-sm md:text-lg px-4 py-2 ${selectedTab === 'draft' ? 'text-blue-600 border-blue-700 border-b-2' : 'text-blue-400'}`}>
          Draft Courses
        </button>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Courses;
