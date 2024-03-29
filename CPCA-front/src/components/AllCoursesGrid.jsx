import React from "react";
import SectionTitle from "./SectionTitle";
import {useLoaderData } from 'react-router-dom'; 


const AllCoursesGrid = () => {

  const courses = useLoaderData();
  console.log(courses); 
  return (
    <>
    <SectionTitle text='All Courses' />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const { _id:id, title, templateImg:image } = course;
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
                {/* <span className="text-secondary">{rating}</span> */}
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default AllCoursesGrid;
