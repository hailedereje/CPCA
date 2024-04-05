import React from "react";
import { api } from "../api";
import { useLoaderData } from "react-router-dom";
import { SectionTitle, Tabs } from "../components";

export const loader =
  (store) =>
  async ({ params }) => {
    // console.log(params.id);

    console.log(params);
    const response = await store
      .dispatch(api.endpoints.getCourse.initiate(params.id))
      .unwrap();
    return response;
  };

function SingleCourse() {
  const course = useLoaderData();
  const { title, description, templateImg } = course;
  return <>
  <SectionTitle text={ "💼 " + title} />
  <Tabs course = {course}/>
  </>
}
export default SingleCourse;
