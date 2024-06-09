import { Outlet, useParams } from "react-router-dom";
import { useGetClassroomByIdQuery } from "@/api";
import ClassroomNavbar from "@/components/Classroom/ClassroomDetailNavbar";

function ClassroomDetails() {
  const { id } = useParams();

  const {
    data: classroom,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetClassroomByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log("classroom", classroom);
  if (isLoading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-4 text-red-500">
        Error: '{error.message}'
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
        
        <Outlet context={{classroom, isFetching, refetch}} />
      </div>
    </div>
  );
}

export default ClassroomDetails;