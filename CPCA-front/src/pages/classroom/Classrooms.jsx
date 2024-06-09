import { useGetClassroomsByInstructorIdQuery, useGetClassroomsByUserIdQuery } from "@/api";
import { useSelector } from "react-redux";
import { Loading } from "@/components";
import { FiBookOpen, FiInfo, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function Classrooms() {
  const { user } = useSelector((store) => store.userState);
  const userId = user?._id;
  const {
    data: classrooms,
    error,
    isLoading,
  } = user.role === "instructor" ? useGetClassroomsByInstructorIdQuery(userId, {
    refetchOnMountOrArgChange: true,
  }): useGetClassroomsByUserIdQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500 font-semibold">
          Error loading classrooms
        </div>
      </div>
    );
  }

  return (
    <div className="container  bg-black-200 mx-auto p-4">
      <div className="flex justify-between border-b p-3  border-base-300 items-center mb-4">
        <h1 className="text-2xl font-bold">Classrooms</h1>
        <Link to={"create"}>
          <button className="btn btn-primary flex items-center">
            <FiPlus className="mr-2" size={20} />
            Add Classroom
          </button>
        </Link>
      </div>{" "}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms?.map((classroom) => (
          <div
            key={classroom._id}
            className="card shadow-xl hover:shadow-2xl p-4 bg-base-300 transition duration-300 rounded-lg"
          >
            <Link to={`${classroom._id}`}>
              <div className="flex items-center mb-2">
                <FiBookOpen className="text-blue-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">{classroom.name}</h2>
              </div>
              <div className="flex items-start">
                <FiInfo className="text-gray-500 mr-2" size={20} />
                <p className="text-gray-700">{classroom.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classrooms;
