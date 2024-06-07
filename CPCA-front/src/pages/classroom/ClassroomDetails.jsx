import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { useGetClassroomByIdQuery } from "@/api"; // Ensure the path is correct
import { FiBookOpen, FiInfo, FiUser } from "react-icons/fi"; // Importing React Icons
import ClassroomNavbar from "@/components/Classroom/ClassroomDetailNavbar";

function ClassroomDetails() {
  const { id } = useParams();
  const { user } = useSelector((store) => store.userState);

  const {
    data: classroom,
    error,
    isLoading,
  } = useGetClassroomByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log("classroom", classroom);
  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-4 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between border-b border-base-200">
        <h1 className="text-2xl font-bold">Classroom Details</h1>
        <div className="navbar-center hidden lg:flex ">
          <ClassroomNavbar />
        </div>
      </div>
      <div className="mt-4">
        
        <Outlet context={{classroom}} />
      </div>
    </div>
  );
}

export default ClassroomDetails;


// {classroom && (
//   <div className="space-y-4">
//     <div className="flex items-center">
//       <FiBookOpen className="mr-2 text-primary" />
//       <p className="text-lg font-semibold">
//         Name: <span className="font-normal">{classroom.name}</span>
//       </p>
//     </div>
//     <div className="flex items-center">
//       <FiInfo className="mr-2 text-primary" />
//       <p className="text-lg font-semibold">
//         Description: <span className="font-normal">{classroom.description}</span>
//       </p>
//     </div>
//   </div>
// )}