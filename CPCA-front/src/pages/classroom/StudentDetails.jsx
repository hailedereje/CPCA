import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useGetStudentProgressQuery } from "@/api";
import { BiLoaderCircle } from "react-icons/bi";
import { MdLockOpen, MdLock, MdDone, MdClose } from "react-icons/md";
import { FiClock } from "react-icons/fi";

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
      <div className="flex justify-center items-center h-full text-red-500">
        Error loading progress
      </div>
    );

  // Calculate overall progress
  const totalModules = studentProgress.length;
  const completedModules = studentProgress.filter((item) => item.completed).length;
  const progressPercentage = (completedModules / totalModules) * 100;

  const {studentId: student} = studentProgress[0]
  return (
    <div className="container mx-auto p-4">
      {/* Student Info and Overall Progress */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <img
            src={student.profileImg}
            alt={student.username}
            className="h-16 w-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold">{student.username}</h1>
            <p className="text-gray-500">{student.studentId}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <p>
            <span className="font-semibold">Email:</span> {student.email}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Phone:</span> {student.phoneNumber}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
          <div className="flex items-center">
            <div className="flex-grow">
              <div className="text-sm font-medium text-gray-600">
                Progress: {progressPercentage.toFixed(1)}%
              </div>
              <div className="h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4">
              <div className="flex items-center mb-2">
                <MdDone className="text-green-500 mr-2" />
                <p className="text-sm">Completed: {completedModules}</p>
              </div>
              <div className="flex items-center">
                <MdClose className="text-red-500 mr-2" />
                <p className="text-sm">Remaining: {totalModules - completedModules}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentProgress.map((progress, index) => (
          <div
            key={progress._id}
            className={`p-4 border rounded-lg transition-shadow duration-300 
              ${progress.lastAccessed ? "bg-blue-50 shadow-lg" : "bg-gray-50 hover:shadow-lg"}
              ${progress.lastAccessed ? "border-blue-200" : "border-gray-200"}
            `}
          >
            <h3 className="text-xl font-medium mb-3">
              {progress.chapterId
                ? `Chapter : ${progress.chapterId.title}`
                : `Lab : ${progress.labId}`}
            </h3>
            <div className="flex items-center mb-3">
              {progress.unlocked ? (
                <MdLockOpen className="mr-2 text-green-500" />
              ) : (
                <MdLock className="mr-2 text-red-500" />
              )}
              <p className="text-sm">
                Unlocked: {progress.unlocked ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center mb-3">
              {progress.completed ? (
                <MdDone className="mr-2 text-green-500" />
              ) : (
                <MdClose className="mr-2 text-red-500" />
              )}
              <p className="text-sm">
                Completed: {progress.completed ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex items-center mb-3">
              <FiClock className="mr-2" />
              <p className="text-sm">
                Last Accessed:{" "}
                {progress.lastAccessed
                  ? new Date(progress.lastAccessed).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDetails;
