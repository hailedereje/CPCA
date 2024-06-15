import React, { useEffect } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { MdError } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useCalculateStudentCourseProgressMutation } from '@/api';

const CourseProgressBar = () => {
  // Replace these with actual IDs
  const classroomId = "666967092ad3d3b4c5a12ed7";
  const studentId = "6659ba2263485025e6fcec2b";
  const courseId = "666963372ad3d3b4c5a12dfc";

  const [calculateStudentCourseProgress, { data,  isLoading, isError, isSuccess, error }] = useCalculateStudentCourseProgressMutation();

  // Click handler to trigger the mutation
  const handleCalculateProgress = async () => {
    try {
        await calculateStudentCourseProgress({ classroomId, studentId, courseId });

    } catch (error) {
      console.error('Failed to calculate course progress', error);
        
    }

t  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        <BiLoaderCircle className="animate-spin h-6 w-6 mr-2" />
        Loading...
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center text-red-500">
        <MdError className="h-6 w-6 mr-2" />
        {error?.message || "Error loading course progress"}
      </div>
    );
  }

  // Handle case when no progress data is available
  if (!data || typeof data.progress !== 'number') {
    return (
      <div className="flex items-center justify-center text-gray-500">
        No progress data available
      </div>
    );
  }

  // Render the progress bar when data is available
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleCalculateProgress}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate Progress
      </button>
      <div className="w-32 h-32">
        <CircularProgressbar
          value={data.progress}
          text={`${data.progress}%`}
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${data.progress / 100})`,
            textColor: '#4A4A4A',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
        />
      </div>
    </div>
  );
};

export default CourseProgressBar;
