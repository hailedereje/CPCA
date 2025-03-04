import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { useLoaderData, Link } from "react-router-dom";
import ProgressIndicator from "./ProgressIndicator";
import { useDispatch } from "react-redux";
import { useGetAllCoursesQuery } from "../api";
import { setSelectedCourse } from "../features/course/courseSlice";
import { toggleSidebar } from "@/features/user/userSlice";
import { Loading } from ".";

const AllCoursesGrid = () => {
  const { data: courses, isLoading: isCoursesLoading } =
    useGetAllCoursesQuery();
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //    if (courses) {
  //      setIsLoading(false);
  //    }
  // }, [courses]);

  // if (isLoading) {
  //    return <div>Loading...</div>
  // }
  if (isCoursesLoading) {
    return <Loading />;
  }
  const handleClick = (id) => {
    dispatch(setSelectedCourse(id));
    dispatch(toggleSidebar());
  };
  return (
    <>
      <SectionTitle text="All Courses" />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const { _id: id, title, templateImg: image } = course;
          // const { id: id, title, templateImg: image } = course;
          console.log(courses);
          return (
            <Link
              onClick={() => handleClick(id)}
              key={id}
              to={`${id}`}
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
                <ProgressIndicator />
                {/* <span className="text-secondary">{rating}</span> */}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default AllCoursesGrid;
