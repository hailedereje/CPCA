/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCourseQuery, useGetLessonsQuery } from "@/api";
import newRequests from "@/utils/newRequest";

function AllLessonsGrid() {
  const courseId = useSelector((state) => state.courseState.selectedCourse);
  // const { data: course, isLoading: isCourseLoading } = useGetCourseQuery(courseId);
  // const {data: lessons, isLoading: isLessonsLoading}= useGetLessonsQuery(courseId);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await newRequests.get(`/courses/course?id=${courseId}`);
      console.log("response", response.data);
    };
    fetchCourse();
  }, []);

  const lessons = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      description:
        "Get started with JavaScript, the world's most popular programming language.",
      duration: "10 minutes",
      thumbnail: "https://example.com/images/lesson1.jpg",
      status: "completed",
    },
    {
      id: 2,
      title: "Variables and Data Types",
      description:
        "Learn about variables, data types, and how to declare them in JavaScript.",
      duration: "20 minutes",
      thumbnail: "https://example.com/images/lesson2.jpg",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Functions and Scope",
      description:
        "Understand functions, scope, and how to work with them in JavaScript.",
      duration: "30 minutes",
      thumbnail: "https://example.com/images/lesson3.jpg",
      status: "not-started",
    },
    {
      id: 4,
      title: "Objects and Arrays",
      description:
        "Explore objects, arrays, and how to use them in JavaScript.",
      duration: "40 minutes",
      thumbnail: "https://example.com/images/lesson4.jpg",
      status: "not-started",
    },
    {
      id: 5,
      title: "DOM Manipulation",
      description: "Learn how to manipulate the DOM using JavaScript.",
      duration: "50 minutes",
      thumbnail: "https://example.com/images/lesson5.jpg",
      status: "not-started",
    },
    {
      id: 6,
      title: "Events and Event Listeners",
      description:
        "Understand events and how to listen for them in JavaScript.",
      duration: "60 minutes",
      thumbnail: "https://example.com/images/lesson6.jpg",
      status: "not-started",
    },
    {
      id: 7,
      title: "Asynchronous JavaScript",
      description:
        "Explore asynchronous programming in JavaScript using callbacks, promises, and async/await.",
      duration: "70 minutes",
      thumbnail: "https://example.com/images/lesson7.jpg",
      status: "not-started",
    },
    {
      id: 8,
      title: "APIs and Fetch",
      description:
        "Learn how to work with APIs and make HTTP requests using the Fetch API.",
      duration: "80 minutes",
      thumbnail: "https://example.com/images/lesson8.jpg",
      status: "not-started",
    },
    {
      id: 9,
      title: "ES6 and Beyond",
      description:
        "Discover the latest features in JavaScript, including arrow functions, template literals, and more.",
      duration: "90 minutes",
      thumbnail: "https://example.com/images/lesson9.jpg",
      status: "not-started",
    },
    {
      id: 10,
      title: "Project: To-Do List",
      description: "Apply your JavaScript skills by building a to-do list app.",
      duration: "100 minutes",
      thumbnail: "https://example.com/images/lesson9.jpg",
      status: "not-started",  
    },
  ];
  return (
    <div className="grid  gap-4 lg:grid-cols-3 ">
      {lessons.map((lesson) => (
        <NavLink to={`lessons/${lesson.id}`} className="" key={lesson.id}>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p>{lesson.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-accent badge-outline">
                  completed
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default AllLessonsGrid;
