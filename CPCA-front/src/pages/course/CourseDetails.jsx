import React, { useState, useEffect, useRef, useCallback } from "react";
import parse from "html-react-parser"
import {
  api,
  useCompleteLessonMutation,
  useGetChaptersProgressQuery,
  useGetLabsProgressQuery,
  useGetLessonsProgressQuery,
  useGetQuizzesProgressQuery,
  useRequestUnlockChapterMutation,
  useRequestUnlockLabMutation,
  useRequestUnlockLessonMutation,
  useRequestUnlockQuizMutation,
} from "@/api";
import {
  FiChevronDown,
  FiChevronRight,
  FiFileText,
  FiBook,
  FiFolder,
  FiClipboard,
  FiUnlock,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  useCourse,
  useLesson,
} from "@/components/createCourse/hooks/course-hooks";
import DOMPurify from "dompurify";
import { SyntaxHighlighter } from "@/components/textEditor/syntax-highlighter";

const CourseDetails = () => {
  const { classroom } = useOutletContext();
  const { data, isLoading, isError } = useCourse(classroom.courseId);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [openLabs, setOpenLabs] = useState(false);
  const [requestUnlockChapter] = useRequestUnlockChapterMutation();
  const [requestUnlockLesson] = useRequestUnlockLessonMutation();
  const [requestUnlockLab] = useRequestUnlockLabMutation();
  const [requestUnlockQuiz] = useRequestUnlockQuizMutation();
  const [completeLesson] = useCompleteLessonMutation();
  const [chapterId, setChapterId] = useState(null);
  const navigate = useNavigate();
  console.log(data)
  // get progress
  const {
    data: chapterProgressData,
    isLoading: chapterProgressLoading,
    isError: chapterProgressError,
    refetch: refetchChapterProgress,
  } = useGetChaptersProgressQuery(
    {
      classroomId: classroom._id,
      courseId: classroom.courseId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: lessonProgressData,
    isLoading: lessonProgressLoading,
    isError: lessonProgressError,
    refetch: refetchLessonProgress,
  } = useGetLessonsProgressQuery(
    {
      classroomId: classroom._id,
      courseId: classroom.courseId,
      chapterId: chapterId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: labProgressData,
    isLoading: labProgressLoading,
    isError: labProgressError,
    refetch: refetchLabProgress,
  } = useGetLabsProgressQuery(
    {
      classroomId: classroom._id,
      courseId: classroom.courseId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: quizProgressData,
    isLoading: quizProgressLoading,
    isError: quizProgressError,
    refetch: refetchQuizProgress,
  } = useGetQuizzesProgressQuery(
    {
      classroomId: classroom._id,
      courseId: classroom.courseId,
    },
    { refetchOnMountOrArgChange: true }
  );

  // request unlock
  const requestChapterUnlock = async (chapterId) => {
    try {
      await requestUnlockChapter({
        classroomId: classroom._id,
        courseId: classroom.courseId,
        chapterId: chapterId,
      }).unwrap();
      refetchChapterProgress();
      toast.success("Chapter unlocked successfully.");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const requestLessonUnlock = async (lessonId) => {
    try {
      await requestUnlockLesson({
        classroomId: classroom._id,
        courseId: classroom.courseId,
        chapterId: chapterId,
        lessonId: lessonId,
      }).unwrap();
      refetchLessonProgress();
      toast.success("Lesson unlocked successfully.");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const requestLabUnlock = async (labId) => {
    try {
      await requestUnlockLab({
        classroomId: classroom._id,
        courseId: classroom.courseId,
        labId: labId,
      }).unwrap();
      refetchLabProgress();
      toast.success("Lab unlocked successfully.");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const requestQuizUnlock = async (quizId) => {
    console.log("unlocking quiz", quizId);
    try {
      await requestUnlockQuiz({
        classroomId: classroom._id,
        courseId: classroom.courseId,
        chapterId: chapterId,
        quizId: quizId,
      }).unwrap();
      refetchQuizProgress();
      toast.success("Quiz unlocked successfully.");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  // render progress
  const renderChapterProgress = (id) => {
    const itemProgress = chapterProgressData?.filter(
      (item) => item.chapterId === id
    )[0];
    if (itemProgress) {
      if (itemProgress.completed) {
        return <FiCheckCircle className="text-green-500 ml-2 h-6 w-6" />;
      } else if (itemProgress.unlocked) {
        return <FiUnlock className="text-yellow-500 ml-2 h-6 w-6" />;
      } else {
        return <FiLock className="text-gray-500 ml-2 h-6 w-6" />;
      }
    }
    return null;
  };
  const renderLessonProgress = (id) => {
    const itemProgress = lessonProgressData?.filter(
      (item) => item.lessonId === id
    )[0];
    if (itemProgress) {
      if (itemProgress.completed) {
        return <FiCheckCircle className="text-green-500 ml-2 h-6 w-6" />;
      } else if (itemProgress.unlocked) {
        return <FiUnlock className="text-yellow-500 ml-2 h-6 w-6" />;
      } else {
        return <FiLock className="text-gray-500 ml-2 h-6 w-6" />;
      }
    }
    return null;
  };
  const renderLabProgress = (id) => {
    const itemProgress = labProgressData?.filter(
      (item) => item.labId === id
    )[0];
    if (itemProgress) {
      if (itemProgress.completed) {
        return <FiCheckCircle className="text-green-500 ml-2 h-6 w-6" />;
      } else if (itemProgress.unlocked) {
        return <FiUnlock className="text-yellow-500 ml-2 h-6 w-6" />;
      } else {
        return <FiLock className="text-gray-500 ml-2 h-6 w-6" />;
      }
    }
    return null;
  };
  const renderQuizProgress = (id) => {
    const itemProgress = quizProgressData?.filter(
      (item) => item.quizId === id
    )[0];
    if (itemProgress) {
      if (itemProgress.completed) {
        return <FiCheckCircle className="text-green-500 ml-2 h-6 w-6" />;
      } else if (itemProgress.unlocked) {
        return <FiUnlock className="text-yellow-500 ml-2 h-6 w-6" />;
      } else {
        return <FiLock className="text-gray-500 ml-2 h-6 w-6" />;
      }
    }
    return null;
  };

  // toggle 
  const toggleChapter = (chapterId) => {
    const itemProgress = chapterProgressData?.filter(
      (item) => item.chapterId === chapterId
    )[0];
    if (itemProgress && !itemProgress.unlocked) {
      toast.error("Please unlock me first.");
      return;
    }
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };
  const toggleLabs = () => {
    setOpenLabs((prev) => !prev);
  };

  // handle click
  const handleLessonClick = (id) => {
    const itemProgress = lessonProgressData?.filter(
      (item) => item.lessonId === id
    )[0];
    if (itemProgress && !itemProgress.unlocked) {
      toast.error("Please unlock me first.");
      return;
    }
    setSelectedLesson(id);
  };
  const handleLabClick = (id) => {
    const itemProgress = labProgressData?.filter(
      (item) => item.labId === id
    )[0];
    if (itemProgress && !itemProgress.unlocked) {
      toast.error("Please unlock me first.");
      return;
    }
    navigate(`labs/${id}`);
  };
  const handleQuizClick = (id) => {
    const itemProgress = quizProgressData?.filter(
      (item) => item.quizId === id
    )[0];
    if (itemProgress && !itemProgress.unlocked) {
      toast.error("Please unlock me first.");
      return;
    }
    else if (itemProgress && itemProgress.completed) {
      toast.error("Quiz already completed.");
      return;
    }
    navigate(`quizzes/${id}`);
  };

  const {
    data: contentData,
    isLoading: contentLoading,
    isError: contentError,
  } = useLesson(selectedLesson);

  useEffect(() => {
    const lessonComplete = async () => {
      const itemProgress = lessonProgressData?.filter(
        (item) => item.lessonId === selectedLesson
      )[0];
      if (itemProgress && itemProgress.completed) return;
      try {
        await completeLesson({
          classroomId: classroom._id,
          courseId: classroom.courseId,
          chapterId,
          lessonId: selectedLesson,
        }).unwrap();
        refetchLessonProgress();
      } catch (error) {
        toast.error("internal error, please try again later.");
      }
    };

    if (selectedLesson) {
      lessonComplete();
    }
  }, [selectedLesson, classroom, chapterId, lessonProgressData, completeLesson, refetchLessonProgress]);

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
      <aside className="w-1/4 h-full bg-white rounded shadow-md p-4 overflow-y-auto">
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
                    <ul className="pl-6">
                      {course.labs.map((lab) => (
                        <li key={lab._id} className="flex gap-2 items-center">
                          <button
                            className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                            onClick={() => handleLabClick(lab._id)}
                            title={lab.title}
                          >
                            <FiFolder className="mr-2" />
                            <span className="w-32 truncate">{lab.title}</span>
                          </button>
                          <button className="hover:bg-gray-400 rounded-full p-3 pl-1" onClick={() => requestLabUnlock(lab._id)}>
                            {renderLabProgress(lab._id)}
                          </button>
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
                      <div className="flex gap-2 items-center">
                        <button
                          className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                          onClick={() => {
                            setChapterId(chapter._id),
                              toggleChapter(chapter._id);
                          }}
                          title={chapter.title}
                        >
                          {openChapters[chapter._id] ? (
                            <FiChevronDown className="mr-2" />
                          ) : (
                            <FiChevronRight className="mr-2" />
                          )}
                          <FiBook className="mr-2" />
                          <span className="w-32 truncate">{chapter.title}</span>
                        </button>
                        <button className="hover:bg-gray-400 rounded-full p-3 pl-1"
                          onClick={() => requestChapterUnlock(chapter._id)}
                        >
                          {renderChapterProgress(chapter._id)}
                        </button>
                      </div>
                      {openChapters[chapter._id] && (
                        <ul className="pl-6">
                          {chapter.lessons.map((lesson) => (
                            <li key={lesson._id} className="flex gap-2 itmes-center">
                              <button
                                className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                                onClick={() => handleLessonClick(lesson._id)}
                                title={lesson.title}
                              >
                                <FiFileText className="mr-2" />
                                <span className="w-32 truncate">{lesson.title}</span>
                              </button>
                              <button className="hover:bg-gray-400 rounded-full p-3 pl-1"
                                onClick={() => requestLessonUnlock(lesson._id)}
                              >
                                {renderLessonProgress(lesson._id)}
                              </button>
                            </li>
                          ))}
                          {chapter.quiz && (
                            <li key={chapter.quiz._id} className="flex gap-2 items-center">
                              <button
                                className="flex items-center w-full p-2 text-left hover:bg-gray-400 rounded"
                                onClick={() => handleQuizClick(chapter.quiz._id)}
                                title={chapter.quiz.title}
                              >
                                <FiClipboard className="mr-2" />
                                <span className="w-32 truncate">{chapter.quiz.title}</span>
                              </button>
                              <button className="hover:bg-gray-400 rounded-full p-3 pl-1"
                                onClick={() =>
                                  requestQuizUnlock(chapter.quiz._id)
                                }
                              >
                                {renderQuizProgress(chapter.quiz._id)}
                              </button>
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content.value.content),
                      }}
                    />
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
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(course.description),
                }}
              />
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDetails;
