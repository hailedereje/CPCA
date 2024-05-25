import newRequests from '@/utils/newRequest';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RiDraftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Loading } from './components/loader';

const DraftCourses = () => {
  const navigate = useNavigate();
  const { data: draftCourses, isLoading, isError } = useQuery({
    queryKey: ['draftCourses'],
    queryFn: () => newRequests.get("/courses/all/drafts"),
    staleTime: 1000 * 6 * 100,
  });

  if (isError) {
    return <div className="text-red-500 text-center mt-8">Error Loading Draft Courses...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-5xl font-bold text-white dark:text-gray-100 mb-6 text-center">Draft Courses</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {draftCourses?.data?.length ? (
            draftCourses.data.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/dashboard/course/update/${course._id}`)}
                className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <RiDraftLine size={28} className="text-blue-500 dark:text-blue-300" />
                  <span className="text-md font-semibold text-gray-800 dark:text-gray-100">
                    {course.title}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">Click to edit this draft course.</p>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full text-gray-200 dark:text-gray-100 text-sm">No draft courses available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DraftCourses;
