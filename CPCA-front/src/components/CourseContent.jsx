import React from "react";
import { FaReact } from "react-icons/fa"; // Importing React icons
import { Link } from "react-router-dom";

function CourseContent() {
  // Define an array of lesson titles
  const lessonTitles = [
    "Introduction to JavaScript",
    "Variables and Data Types",
    "Operators and Expressions",
    "Control Flow and Loops",
    "Functions",
    "Arrays and Objects",
    "DOM Manipulation",
    "Event Handling",
    "AJAX and Fetch",
    "ES6 Features",
  ];

  return (
    <div className="p-4 my-3 border-t border-base-400 border-b">
      <h3 className="text-md font-semibold mb-2">
        What You'll Learn from this course 😊
      </h3>
      <ul>
        {/* Map through the lessonTitles array and render each lesson */}
        {lessonTitles.map((title, index) => (
          <Link>
            <li key={index} className="flex items-center mb-2">
              <FaReact className="mr-2" /> {/* React icon */}
              {title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CourseContent;
