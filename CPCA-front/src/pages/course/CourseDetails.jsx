import React, { useState, useEffect } from "react";
import { api } from "@/api"; // Adjust the import path as needed
import {
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiBook,
  FiFolder,
  FiClipboard,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { Link, useOutletContext } from "react-router-dom";
import {
  useCourse,
  useLesson,
} from "@/components/createCourse/hooks/course-hooks";
import { CheckCircleIcon } from "@heroicons/react/solid";
import DOMPurify from "dompurify";
import { SyntaxHighlighter } from "@/components/textEditor/syntax-highlighter";

const CourseDetails = () => {
  const { classroom } = useOutletContext();
  const { data, isLoading, isError } = useCourse(classroom.courseId);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [openLabs, setOpenLabs] = useState(false);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (data) {
      fetchProgress(data.data.course?.id);
    }
  }, [data]);

  const fetchProgress = async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/progress`);
      setProgress(response.data);
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      toast.error("Failed to load progress. Please try again later.");
    }
  };

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const toggleLabs = () => {
    setOpenLabs((prev) => !prev);
  };

  const handleLessonClick = (id) => {
    setSelectedLesson(id);
  };

  const renderProgress = (id, type) => {
    const itemProgress = progress[type]?.[id];
    if (itemProgress) {
      return itemProgress.completed ? (
        <CheckCircleIcon className="text-green-500 ml-2 h-6 w-6" />
      ) : (
        <span className="text-yellow-500 ml-2">In Progress</span>
      );
    }
    return null;
  };

  const {
    data: contentData,
    isLoading: contentLoading,
    isError: contentError,
  } = useLesson(selectedLesson);

  useEffect(() => {
    if (!contentLoading && !contentError && contentData) {
      setSelectedContent(contentData?.data.lesson);
    }
  }, [contentData, contentLoading, contentError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading course details</div>;
  }
  const course = data.data.course;

  return (
    <div className="flex h-[90vh]">
      <aside className="w-1/4 h-full bg-slate-300 rounded shadow p-4 overflow-y-auto">
        {course && (
          <div>
            <h2 className="text-2xl font-bold my-4 text-center">
              Table of Content
            </h2>

            <div className="mb-4">
              <h3 className="text-xl font-bold">Labs</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                    onClick={toggleLabs}
                  >
                    {openLabs ? (
                      <FiChevronDown className="mr-2" />
                    ) : (
                      <FiChevronRight className="mr-2" />
                    )}
                    <FiFolder className="mr-2" />
                    Labs
                  </button>
                  {openLabs && (
                    <ul className="pl-6 space-y-2">
                      {course.labs.map((lab) => (
                        <li key={lab._id}>
                          <Link
                            className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                            to={`labs/${lab._id}`}
                          >
                            <FiFolder className="mr-2" />
                            {lab.title}
                            {renderProgress(lab._id, "lab")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold">Chapters</h3>
              <ul className="divide-y-2">
                {course.chapters.map((chapter) => (
                  <li key={chapter._id} className="p-2">
                    <div>
                      <button
                        className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                        onClick={() => toggleChapter(chapter._id)}
                      >
                        {openChapters[chapter._id] ? (
                          <FiChevronDown className="mr-2" />
                        ) : (
                          <FiChevronRight className="mr-2" />
                        )}
                        <FiBook className="mr-2" />
                        {chapter.title}
                        {renderProgress(chapter._id, "chapter")}
                      </button>
                      {openChapters[chapter._id] && (
                        <ul className="pl-6 space-y-2">
                          {chapter.lessons.map((lesson) => (
                            <li key={lesson._id}>
                              <button
                                className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                                onClick={() =>
                                  handleLessonClick(lesson._id)
                                }
                              >
                                <FiFileText className="mr-2" />
                                {lesson.title}
                                {renderProgress(lesson._id, "lesson")}
                              </button>
                            </li>
                          ))}
                          {chapter.quiz && (
                            <li key={chapter.quiz._id}>
                              <Link
                                className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                                to={`quizzes/${chapter.quiz._id}`}
                              >
                                <FiClipboard className="mr-2" />
                                {chapter.quiz.title}
                                {renderProgress(chapter.quiz._id, "quiz")}
                              </Link>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </aside>
      <main className="w-3/4 h-full overflow-auto bg-white rounded shadow p-4">
        {selectedContent ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedContent.title}
            </h2>
            {selectedContent.content.map((content, index) => {
              return (
                <div key={index} className="mb-4">
                  {content.type === "text" && (
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.value.content) }} />
                  )}
                  {content.type === "code" && (
                    <SyntaxHighlighter code={content.value} />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Select a content to view
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDetails;
