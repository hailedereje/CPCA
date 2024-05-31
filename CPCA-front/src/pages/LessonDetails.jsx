import { useGetCourseQuery } from "@/api";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Mark from "@/icons/MarkCompleted";

function LessonDetails() {
  const { id } = useSelector((store) => store.courseState.selectedCourse);
  const { data: course, isLoading } = useGetCourseQuery(id);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description:
        "Dive into the basics of JavaScript, including variables, data types, and control structures.",
      duration: "30 minutes",
      thumbnail: "https://example.com/images/fundamentals.jpg",
      status: "completed",
    },
    {
      id: 2,
      title: "DOM Manipulation",
      description:
        "Learn how to interact with the Document Object Model to dynamically update web pages.",
      duration: "45 minutes",
      thumbnail: "https://example.com/images/dom.jpg",
      status: "completed",
    },
    {
      id: 3,
      title: "Asynchronous JavaScript",
      description:
        "Understand how to work with asynchronous operations in JavaScript, including promises and async/await.",
      duration: "50 minutes",
      thumbnail: "https://example.com/images/async.jpg",
      status: "not-started",
    },
    {
      id: 4,
      title: "JavaScript and APIs",
      description:
        "Explore how to fetch data from APIs using JavaScript, including handling JSON data.",
      duration: "60 minutes",
      thumbnail: "https://example.com/images/api.jpg",
      status: "not-started",
    },
    {
      id: 5,
      title: "JavaScript and the Browser",
      description:
        "Discover how JavaScript interacts with the browser, including handling events and forms.",
      duration: "40 minutes",
      thumbnail: "https://example.com/images/browser.jpg",
      status: "not-started",
    },
    {
      id: 6,
      title: "JavaScript and Node.js",
      description:
        "Learn the basics of server-side JavaScript with Node.js, including creating a simple server.",
      duration: "55 minutes",
      thumbnail: "https://example.com/images/node.jpg",
      status: "not-started",
    },
    {
      id: 7,
      title: "JavaScript and Databases",
      description:
        "Understand how to connect JavaScript applications to databases, including MongoDB and SQL.",
      duration: "65 minutes",
      thumbnail: "https://example.com/images/database.jpg",
      status: "not-started",
    },
    {
      id: 8,
      title: "Advanced JavaScript Concepts",
      description:
        "Explore advanced JavaScript concepts such as closures, prototypes, and ES6 features.",
      duration: "70 minutes",
      thumbnail: "https://example.com/images/advanced.jpg",
      status: "not-started",
    },
  ];

  console.log(course);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 min-h-screen">
      <div className="col-span-1 bg-base-300 rounded shadow  pl-1 box-border">
        <h2 className="text-2xl font-bold my-4 text-center">
          Table of Contents
        </h2>
        <ul>
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="mb-2 flex items-center justify-between"
            >
              <button
                className={`btn  btn-wide ${
                  selectedLesson === lesson ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => setSelectedLesson(lesson)}
              >
                {lesson.title}
              </button>
              <span>
                {selectedLesson && selectedLesson.status && (
                  <Mark completed={selectedLesson.status === "completed"} />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 bg-base-100 rounded shadow p-4">
        {selectedLesson && (
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">
                {selectedLesson.title}
              </h2>
              <p className="text-sm text-gray-500">
                Estimated Time: {selectedLesson.duration}
              </p>
            </div>
            <div>
              <p className="text-gray-600">{selectedLesson.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default LessonDetails;
