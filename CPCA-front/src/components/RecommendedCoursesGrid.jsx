import React from "react";
import SectionTitle from "./SectionTitle";

// Dummy data with real image URLs and titles
const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1533597782497-8b30fcf0431b", // Real image URL 1
  },
  {
    id: 2,
    title: "Python for Data Science",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1524452442799-384c65981b4e", // Real image URL 2
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1520698207772-ea2bf1fc58a0", // Real image URL 3
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
