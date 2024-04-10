import React from "react";
import { NavLink } from "react-router-dom";

const lessons = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description:
      "Get started with JavaScript, the world's most popular programming language.",
    duration: "10 minutes",
    thumbnail: "https://example.com/images/lesson1.jpg",
    status: 'completed'
  },
  {
    id: 2,
    title: "Variables and Data Types",
    description:
      "Learn about variables, data types, and how to declare them in JavaScript.",
    duration: "20 minutes",
    thumbnail: "https://example.com/images/lesson2.jpg",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Control Structures",
    description:
      "Understand how to use if-else statements, loops, and switch cases in JavaScript.",
    duration: "30 minutes",
    thumbnail: "https://example.com/images/lesson3.jpg",
    status: 'completed'
  },
  {
    id: 4,
    title: "Functions and Scope",
    description:
      "Dive into functions, parameters, and the concept of scope in JavaScript.",
    duration: "25 minutes",
    thumbnail: "https://example.com/images/lesson4.jpg",
    status: 'completed'

  },
  {
    id: 5,
    title: "Objects and Arrays",
    description:
      "Learn about objects, arrays, and how to manipulate them in JavaScript.",
    duration: "35 minutes",
    thumbnail: "https://example.com/images/lesson5.jpg",
    status: "in-progress"

  },
  {
    id: 6,
    title: "DOM Manipulation",
    description:
      "Discover how to interact with the Document Object Model (DOM) using JavaScript.",
    duration: "40 minutes",
    thumbnail: "https://example.com/images/lesson6.jpg",
    status: "in-progress"

  },
  {
    id: 7,
    title: "Events and Event Handlers",
    description:
      "Learn about events, event handlers, and how to create interactive web pages.",
    duration: "30 minutes",
    thumbnail: "https://example.com/images/lesson7.jpg",
    status: "in-progress"

  },
  {
    id: 8,
    title: "Asynchronous JavaScript",
    description:
      "Understand asynchronous programming in JavaScript, including promises and async/await.",
    duration: "45 minutes",
    thumbnail: "https://example.com/images/lesson8.jpg",
    status: "completed"

  },
  {
    id: 9,
    title: "APIs and Fetch",
    description:
      "Learn how to fetch data from APIs using JavaScript's Fetch API.",
    duration: "35 minutes",
    thumbnail: "https://example.com/images/lesson9.jpg",
  },
  {
    id: 10,
    title: "Final Project",
    description:
      "Apply your JavaScript knowledge to build a final project. This is where you showcase your skills!",
    duration: "N/A",
    thumbnail: "https://example.com/images/lesson10.jpg",
  },
];

function AllLessonsGrid() {
  return (
    <div className="grid  gap-4 lg:grid-cols-3 ">
      {lessons.map((lesson) => (
        <NavLink to = {`lessons/${lesson.id}`} className="" key={lesson.id}>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p>{lesson.description}</p>
              <div className="card-actions justify-end">
              <div className="badge badge-accent badge-outline">completed</div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default AllLessonsGrid;
