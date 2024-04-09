import React from "react";
import { AllLessonsGrid, BreadCrumb, VideoPlayer } from "../components";

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

function LessonDetails() {
  return (
    <div>
      <BreadCrumb />

      <div className="flex  gap-x-1 ">
        <div className="flex flex-auto  ">
            <AllLessonsGrid />
        </div>
        {/* <div className="w-[350px] flex-none border border-base-300 bg-base-200 p-2 rounded h-screen ">
          <h2 className="border-b border-base-300 mb-2 pb-2">Top Chats</h2>
        </div> */}
      </div>
    </div>
  );
}

export default LessonDetails;
