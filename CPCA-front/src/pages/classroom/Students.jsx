import React from "react";
import StudentList from "@/components/Classroom/StudentList";
import { useOutletContext } from "react-router-dom";

function Students() {
   const {classroom}  =  useOutletContext();
  return (
    <div>
      <StudentList students={classroom.students} />
    </div>
  );
}

export default Students;
