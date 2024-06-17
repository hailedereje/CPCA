import {
  useGetClassroomsByInstructorIdQuery,
  useGetClassroomsByUserIdQuery,
  useDeleteClassroomMutation
} from "@/api";
import { useSelector } from "react-redux";
import { FiBookOpen, FiPlus, FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Loading } from "@/components/createCourse/components/loader";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

function Classrooms() {
  const { user } = useSelector((store) => store.userState);
  const userId = user?._id;
  const {
    data: classroomsData,
    error,
    isLoading,
  } = user.role === "instructor"
    ? useGetClassroomsByInstructorIdQuery(userId, {
        refetchOnMountOrArgChange: true,
      })
    : useGetClassroomsByUserIdQuery(userId, {
        refetchOnMountOrArgChange: true,
      });

  const [deleteClassroom] = useDeleteClassroomMutation();
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    if (classroomsData) {
      setClassrooms(classroomsData);
    }
  }, [classroomsData]);

  const handleDeleteClassroom = async (classroomId) => {
    try {
      await deleteClassroom(classroomId);
      setClassrooms((prevClassrooms) =>
        prevClassrooms.filter((classroom) => classroom._id !== classroomId)
      );
    } catch (error) {
      console.error(error);
    }
  }

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

  if (!classrooms?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full gap-2 fixed">
        <span className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold mb-2">No Classrooms Available</h2>
          <p className="text-gray-600 mb-4">You currently don't have any classrooms.</p>
        </span>
        {user.role === "instructor" && (
          <Link to={"create"}>
            <button className="btn btn-primary flex items-center">
              <FiPlus className="mr-2" size={20} />
              Add Classroom
            </button>
          </Link>
        )}
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
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {classrooms.map((classroom) => (
          <div key={classroom._id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition duration-300 relative">
            <Link to={`${classroom._id}`}>
              <div className="card-body p-4">
                <div className="flex items-center mb-2">
                  <FiBookOpen className="text-blue-500 mr-2" size={24} />
                  <h2 className="card-title text-xl font-semibold">
                    {classroom.name} 
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {classroom.description.slice(0, 100)}...
                </p>
                <div className="card-actions justify-end mt-2">
                  <div className="badge badge-accent badge-outline">
                    {classroom.students?.length} Students
                  </div>
                </div>
              </div>
            </Link>
            {user.role === "instructor" && (
              <Menu as="div" className="absolute top-2 right-2">
                <Menu.Button className="text-gray-600 hover:text-gray-800">
                  <FiMoreVertical size={20} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-10 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleDeleteClassroom(classroom._id)}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                          >
                            Delete Classroom
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classrooms;
