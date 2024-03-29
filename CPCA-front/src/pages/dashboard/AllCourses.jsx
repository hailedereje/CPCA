import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { AllCoursesGrid, CourseContent } from "../../components";
import { api } from "../../api";

export const loader = (store) => async () => {
  const response = await store
    .dispatch(api.endpoints.getAllCourses.initiate())
    .unwrap();
  // console.log(response);
  return response;
};
function AllCourses() {
  return (
    <div>
      <AllCoursesGrid />
    </div>
  );
}

export default AllCourses;
