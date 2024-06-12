import newRequests from '@/utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RiDraftLine, RiCheckLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Loading } from './components/loader';
import { useCourses } from './hooks/course-hooks';

const Courses = () => {
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
          className="relative bg-slate-50 p-6 rounded-xl shadow-sm border transform hover:-translate-y-1 hover:shadow-md transition-transform duration-300 cursor-pointer"
        >
          <div className="absolute bottom-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
              {course.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span>
            {course.isPublished ? (
              <RiCheckLine size={24} className="text-green-700" />
            ) : (
              <RiDraftLine size={24} className="text-blue-700" />
            )}
            </span>
            <span className="text-lg font-medium capitalize text-gray-800">
              {course.title}
            </span>
          </div>
          <p className="mt-2 text-gray-600 text-xs">Click to edit</p>
        </div>
      ))
    ) : (
      <div className="text-center col-span-full text-gray-200 dark:text-gray-100 text-sm">No courses available.</div>
    );
  };

  const renderContent = () => {
    if (isError) {
      return (
        <div className="text-red-500 text-center mt-8 fixed inset-0 h-full flex items-center justify-center">
          <span className='text-xl font-bold capitalize '>Error Loading Courses...</span>
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
      <h1 className="text-5xl font-bold text-white dark:text-blue-600 mb-6 text-center">Courses</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setSelectedTab('all')} className={`px-4 py-2 ${selectedTab === 'all' ? ' text-blue-600 border-blue-700 border-b-2' : ' text-blue-400'}`}>
          All Courses
        </button>
        <button onClick={() => setSelectedTab('published')} className={`px-4 py-2 ${selectedTab === 'published' ? 'text-blue-600 border-blue-700 border-b-2' : ' text-blue-400'}`}>
          Published Courses
        </button>
        <button onClick={() => setSelectedTab('draft')} className={`px-4 py-2 ${selectedTab === 'draft' ? 'text-blue-600 border-blue-700 border-b-2' : ' text-blue-400'}`}>
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
