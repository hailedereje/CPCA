import React from "react";
import StudentList from "@/components/Classroom/StudentList";
import { Outlet, useOutletContext } from "react-router-dom";

function Students() {
  const { classroom } = useOutletContext();
  console.log(useOutletContext());
  return (
    <div>
      <StudentList students={classroom.students} />
    </div>
  );
}

export default Students;
