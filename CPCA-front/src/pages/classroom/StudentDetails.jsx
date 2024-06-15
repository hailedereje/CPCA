import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import {
  useGetStudentChaptersProgressQuery,
  useGetStudentLabsProgressQuery,
  useGetStudentQuizzesProgressQuery
} from "@/api";
import { BiLoaderCircle } from "react-icons/bi";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import useLessonsProgress from "@/hooks/useLessonsProgress";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { classroom } = useOutletContext();
  const { _id: classroomId } = classroom;

  const {
    data: chaptersProgress,
    isLoading: isLoadingChapters,
    error: errorChapters,
  } = useGetStudentChaptersProgressQuery({ classroomId, studentId });

  const {
    data: labsProgress,
    isLoading: isLoadingLabs,
    error: errorLabs,
  } = useGetStudentLabsProgressQuery({ classroomId, studentId });

  const {
    data: quizzesProgress,
    isLoading: isLoadingQuizzes,
    error: errorQuizzes,
  } = useGetStudentQuizzesProgressQuery({ classroomId, studentId });

  const chapterIds = chaptersProgress ? chaptersProgress.map(chapter => chapter.chapterId._id) : [];
  const lessonsProgress = useLessonsProgress(classroomId, studentId, chapterIds);

  if (isLoadingChapters || isLoadingLabs || isLoadingQuizzes) {
    return (
      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
        <BiLoaderCircle className="animate-spin h-6 w-6 mr-2" />
        Loading...
      </div>
    );
  }

  if (errorChapters || errorLabs || errorQuizzes) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error loading progress
      </div>
    );
  }

  const { studentId: student } = chaptersProgress[0];

  return (
    <div className="container mx-auto p-4">
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
            <span className="font-semibold">Phone:</span>{" "}
            {student.phoneNumber}
          </p>
        </div>
      </div>

      {/* Chapters Progress */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Chapters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chaptersProgress.map((chapter) => (
            <div
              key={chapter.chapterId._id}
              className={`p-4 border rounded-lg shadow-md ${
                chapter.completed
                  ? "bg-green-50 border-green-200"
                  : chapter.unlocked
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">
                {chapter.chapterId.title}
              </h4>
              <div className="flex items-center mb-2">
                {chapter.completed ? (
                  <MdCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <MdCancel className="text-red-500 mr-2" />
                )}
                <p className="text-sm">
                  {chapter.completed
                    ? "Completed"
                    : chapter.unlocked
                    ? "Unlocked"
                    : "Locked"}
                </p>
              </div>
              <p className="text-sm mb-2">
                <span className="font-semibold">Lessons:</span> {chapter.chapterId.lessons.length}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Quiz:</span> {chapter.chapterId.quiz ? "Available" : "Not available"}
              </p>
              {lessonsProgress[chapter.chapterId._id] ? (
                <div className="mt-4">
                  <h5 className="text-md font-bold">Lessons Progress:</h5>
                  {lessonsProgress[chapter.chapterId._id].map((lesson) => (
                    <div
                      key={lesson.lessonId._id}
                      className={`p-2 border rounded-lg mb-2 ${
                        lesson.completed
                          ? "bg-green-50 border-green-200"
                          : lesson.unlocked
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <h6 className="text-sm font-semibold">{lesson.lessonId.title}</h6>
                      <div className="flex items-center">
                        {lesson.completed ? (
                          <MdCheckCircle className="text-green-500 mr-2" />
                        ) : (
                          <MdCancel className="text-red-500 mr-2" />
                        )}
                        <p className="text-xs">
                          {lesson.completed
                            ? "Completed"
                            : lesson.unlocked
                            ? "Unlocked"
                            : "Locked"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-gray-500">Loading lessons progress...</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Labs Progress */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Labs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labsProgress.map((lab) => (
            <div
              key={lab.labId._id}
              className={`p-4 border rounded-lg shadow-md ${
                lab.completed
                  ? "bg-green-50 border-green-200"
                  : lab.unlocked
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">{lab.labId.title}</h4>
              <div className="flex items-center mb-2">
                {lab.completed ? (
                  <MdCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <MdCancel className="text-red-500 mr-2" />
                )}
                <p className="text-sm">
                  {lab.completed
                    ? "Completed"
                    : lab.unlocked
                    ? "Unlocked"
                    : "Locked"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quizzes Progress */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Quizzes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzesProgress.map((quiz) => (
            <div
              key={quiz.quizId._id}
              className={`p-4 border rounded-lg shadow-md ${
                quiz.completed
                  ? "bg-green-50 border-green-200"
                  : quiz.unlocked
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">{quiz.quizId.title}</h4>
              <div className="flex items-center mb-2">
                {quiz.completed ? (
                  <MdCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <MdCancel className="text-red-500 mr-2" />
                )}
                <p className="text-sm">
                  {quiz.completed
                    ? "Completed"
                    : quiz.unlocked
                    ? "Unlocked"
                    : "Locked"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDetails;
