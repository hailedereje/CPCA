import {
  useGetClassroomsByInstructorIdQuery,
  useGetClassroomsByUserIdQuery,
} from "@/api";
import { useSelector } from "react-redux";
import { FiBookOpen, FiInfo, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Loading } from "@/components/createCourse/components/loader";

function Classrooms() {
  const { user } = useSelector((store) => store.userState);
  const userId = user?._id;
  const {
    data: classrooms,
    error,
    isLoading,
  } = user.role === "instructor"
    ? useGetClassroomsByInstructorIdQuery(userId, {
        refetchOnMountOrArgChange: true,
      })
    : useGetClassroomsByUserIdQuery(userId, {
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
    <div className="p-4">
      <div className="flex justify-between border-b p-3 border-base-300 items-center mb-4">
        <h1 className="text-2xl font-bold">Classrooms</h1>
        {user.role === "instructor" && (
          <Link to={"create"}>
            <button className="btn btn-primary flex items-center">
              <FiPlus className="mr-2" size={20} />
              Add Classroom
            </button>
          </Link>
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {classrooms?.map((classroom) => (
          <Link to={`${classroom._id}`} key={classroom._id}>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
              <div className="card-body">
                <div className="flex items-center mb-2">
                  <FiBookOpen className="text-blue-500 mr-2" size={24} />
                  <h2 className="card-title text-xl font-semibold">
                    {classroom.name}
                  </h2>
                </div>
                <p className="text-gray-700">
                  {classroom.description.slice(0, 100)}...
                </p>
                <div className="card-actions justify-end mt-2">
                  <div className="badge badge-accent badge-outline">
                    {classroom.students?.length} Students
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Classrooms;
