import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useGetStudentProgressQuery } from "@/api";
import { FiCheckCircle, FiXCircle, FiClock, FiFileText } from "react-icons/fi";
import { BiLoaderCircle } from "react-icons/bi";

function StudentDetails() {
  const { studentId } = useParams();
  const { classroom } = useOutletContext();

  const {
    data: studentProgress,
    isLoading,
    error,
  } = useGetStudentProgressQuery({
    classroomId: classroom._id,
    studentId: studentId,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
        <BiLoaderCircle className="animate-spin h-6 w-6 mr-2" />
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-full">
        Error loading progress
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Student Progress for {studentId}
      </h1>
      {studentProgress && studentProgress.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Course: {classroom.courseId}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentProgress.map((progress, index) => (
              <div
                key={progress._id}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <h3 className="text-lg font-medium mb-2">
                  Chapter {index + 1}: {progress.chapterId}
                </h3>
                <div className="flex items-center mb-2">
                  <FiCheckCircle
                    className={`mr-2 ${
                      progress.completed ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <p className="text-sm">
                    Completed: {progress.completed ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FiXCircle
                    className={`mr-2 ${
                      progress.unlocked ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <p className="text-sm">
                    Unlocked: {progress.unlocked ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FiClock className="mr-2" />
                  <p className="text-sm">
                    Last Accessed:{" "}
                    {progress.lastAccessed
                      ? new Date(progress.lastAccessed).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div className="flex items-center">
                  <FiFileText className="mr-2" />
                  <p className="text-sm">
                    Answers:{" "}
                    {progress.answers.length > 0
                      ? JSON.stringify(progress.answers)
                      : "No answers submitted"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          No progress data available
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
