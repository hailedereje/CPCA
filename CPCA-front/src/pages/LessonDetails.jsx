import { useGetCourseQuery } from "@/api";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { LockClosedIcon, LockOpenIcon, CheckCircleIcon } from "@heroicons/react/solid";

function LessonDetails() {
  const { id } = useSelector((store) => store.courseState.selectedCourse);
  const { data: course, isLoading } = useGetCourseQuery(id);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [timeSpent, setTimeSpent] = useState({});
  const [lastAccessed, setLastAccessed] = useState({});
  const [intervals, setIntervals] = useState({});

  const lessons = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Dive into the basics of JavaScript, including variables, data types, and control structures.",
      duration: 30 * 60, // in seconds
      thumbnail: "https://example.com/images/fundamentals.jpg",
      status: "completed",
    },
    {
      id: 2,
      title: "DOM Manipulation",
      description: "Learn how to interact with the Document Object Model to dynamically update web pages.",
      duration: 45 * 60, // in seconds
      thumbnail: "https://example.com/images/dom.jpg",
      status: "completed",
    },
    {
      id: 3,
      title: "Asynchronous JavaScript",
      description: "Understand how to work with asynchronous operations in JavaScript, including promises and async/await.",
      duration: 50 * 60, // in seconds
      thumbnail: "https://example.com/images/async.jpg",
      status: "unlocked",
    },
    {
      id: 4,
      title: "JavaScript and APIs",
      description: "Explore how to fetch data from APIs using JavaScript, including handling JSON data.",
      duration: 60 * 60, // in seconds
      thumbnail: "https://example.com/images/api.jpg",
      status: "not-started",
    },
    {
      id: 5,
      title: "JavaScript and the Browser",
      description: "Discover how JavaScript interacts with the browser, including handling events and forms.",
      duration: 40 * 60, // in seconds
      thumbnail: "https://example.com/images/browser.jpg",
      status: "not-started",
    },
    {
      id: 6,
      title: "JavaScript and Node.js",
      description: "Learn the basics of server-side JavaScript with Node.js, including creating a simple server.",
      duration: 55 * 60, // in seconds
      thumbnail: "https://example.com/images/node.jpg",
      status: "not-started",
    },
    {
      id: 7,
      title: "JavaScript and Databases",
      description: "Understand how to connect JavaScript applications to databases, including MongoDB and SQL.",
      duration: 65 * 60, // in seconds
      thumbnail: "https://example.com/images/database.jpg",
      status: "not-started",
    },
    {
      id: 8,
      title: "Advanced JavaScript Concepts",
      description: "Explore advanced JavaScript concepts such as closures, prototypes, and ES6 features.",
      duration: 70 * 60, // in seconds
      thumbnail: "https://example.com/images/advanced.jpg",
      status: "not-started",
    },
  ];

  useEffect(() => {
    return () => {
      // Cleanup intervals on unmount
      Object.values(intervals).forEach(clearInterval);
    };
  }, [intervals]);

  const handleLessonClick = (lesson) => {
    if (lesson.status === "not-started") {
      // Handle unlock request
      unlockLesson(lesson);
    } else {
      setSelectedLesson(lesson);
      if (!lastAccessed[lesson.id]) {
        setLastAccessed((prev) => ({
          ...prev,
          [lesson.id]: new Date().toLocaleString(),
        }));
      }
      if (!intervals[lesson.id]) {
        const interval = setInterval(() => {
          setTimeSpent((prev) => ({
            ...prev,
            [lesson.id]: (prev[lesson.id] || 0) + 1,
          }));
        }, 1000); // Update every second
        setIntervals((prev) => ({
          ...prev,
          [lesson.id]: interval,
        }));
      }
    }
  };

  const unlockLesson = (lesson) => {
    // Replace with actual unlock request logic
    console.log(`Unlock request sent for lesson ${lesson.id}`);
    lesson.status = "unlocked";
    setSelectedLesson(lesson);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs} hrs ` : ""}${mins} mins ${secs} secs`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 min-h-screen">
      <div className="col-span-1 bg-gray-200 rounded shadow p-2">
        <h2 className="text-2xl font-bold my-4 text-center">Table of Contents</h2>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} className="mb-2 flex items-center justify-between">
              <button
                className={`btn btn-wide ${selectedLesson === lesson ? "bg-green-500 text-white" : ""}`}
                onClick={() => handleLessonClick(lesson)}
              >
                {lesson.title}
              </button>
              <span>
                {lesson.status === "completed" ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                ) : lesson.status === "not-started" ? (
                  <LockClosedIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <LockOpenIcon className="h-6 w-6 text-yellow-500" />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 bg-white rounded shadow p-4">
        {selectedLesson && (
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">{selectedLesson.title}</h2>
              <div className="text-sm text-gray-500">
                <p>Estimated Time: {formatTime(selectedLesson.duration)}</p>
                <p>Time Left: {formatTime(selectedLesson.duration - (timeSpent[selectedLesson.id] || 0))}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600">{selectedLesson.description}</p>
            </div>
            <div className="mt-4">
              <p>
                <strong>Time Spent:</strong> {formatTime(timeSpent[selectedLesson.id] || 0)}
              </p>
              <p>
                <strong>Last Accessed:</strong> {lastAccessed[selectedLesson.id] || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonDetails;
