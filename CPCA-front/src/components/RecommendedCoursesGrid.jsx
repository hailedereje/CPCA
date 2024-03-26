import React from "react";
import SectionTitle from "./SectionTitle";

// Dummy data with real image URLs and titles
const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Real image URL 1
  },
  {
    id: 2,
    title: "Python for Data Science",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Real image URL 2
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Real image URL 3
  },
];

const RecommendedCoursesGrid = () => {
  return (
    <>
    <SectionTitle text='Recommended Courses' />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const { id, title, rating, image } = course;
          return (
            <a
              key={id}
              href={`/products/${id}`}
              className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title capitalize tracking-wider">
                  {title}
                </h2>
                <span className="text-secondary">{rating}</span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default RecommendedCoursesGrid;
