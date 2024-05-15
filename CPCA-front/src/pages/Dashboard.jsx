import React from "react";
import { BigSidebar, DashboardNavbar, SubmitBtn } from "../components";
import { Outlet } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div className="w-66">
          <BigSidebar />
        </div>
        <div className="flex-grow flex  flex-col justify-center">
          <div className="  ">
            <DashboardNavbar />
          </div>
          <div className=" m-1 flex-grow p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
  {
    /* <Greeting /> */
  }
  {
    /* <SectionTitle text="My Courses" /> */
  }

  {
    /* <div className=" border border-base-200 m-4 flex items-center justify-between p-4">
        <div className="collapse   bg-base-200 w-3/4  mt-2">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Introduction to Javascript
          </div>
          <div className="collapse-content flex flex-col">
            <CourseContent />
            <div className=" self-end">
              <SubmitBtn text="Resume Learning" />
            </div>
          </div>
        </div>

        <div
          className="radial-progress text-primary text-xs  border "
          style={{ "--value": 70 }}
          role="progressbar"
        >
          70%
        </div>
      </div>
      <div className="join  flex justify-end  ">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div> */
  }

  {
    /* <RecommendedCoursesGrid /> */
  }
  // </div>
}

export default Dashboard;
