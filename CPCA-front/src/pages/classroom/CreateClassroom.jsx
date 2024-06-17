import { api, useGetCoursesByInstructorIdQuery } from "@/api";
import { SectionTitle, SubmitBtn } from "@/components";
import CreateClassroomForm from "@/components/Classroom/CreateClassroomForm";
import { Loading } from "react-daisyui";
import { useSelector } from "react-redux";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";

export const createClassroomAction =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const result = await store
        .dispatch(api.endpoints.createClassroom.initiate(data))
        .unwrap();
      if (result) {
        toast.success("Classroom created successfully");
        return redirect("/dashboard/classrooms");
      }
    } catch (err) {
      const errorMessage =
        err?.data?.msg || "Server Error. Please try again later.";
      toast.error(errorMessage);
    }
    return null;
  };

function CreateClassroom() {
  const { user } = useSelector((store) => store.userState);
  const { data: courses, isLoading: isCoursesLoading } =
    useGetCoursesByInstructorIdQuery(user._id);

  if (isCoursesLoading) {
    return <Loading />;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="card p-8 bg-base-100 shadow-lg border-2 border-dashed border-gray-300 text-center">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4">Cannot Create Classroom</h2>
          <p className="text-gray-700">You are not assigned to any courses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <section id="create-classroom" className="h-screen grid place-items-center w-full">
      <Form
        method="post"
        className="card p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 border-2 border-dashed border-gray-300"
      >
        <SectionTitle text={"Create Classroom"} />
        <div className="w-[70%]">
          <CreateClassroomForm type="text" label="Name" name="name" />
          <CreateClassroomForm type="text" label="Description" name="description" />
          <div className="form-control mt-5">
            <label htmlFor="courseId" className="label">
              <span className="label-text capitalize">Course</span>
            </label>
            <select
              id="courseId"
              name="courseId"
              className="select select-bordered select-text capitalize"
            >
              <option key={"0"} className="capitalize" value="">
                Select a course
              </option>
              {courses &&
                courses.map((course) => (
                  <option className="capitalize" key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-4">
            <SubmitBtn className="bg-green-2 btn btn-secondary" text="Create Classroom" />
          </div>
        </div>
      </Form>
    </section>
  );
}

export default CreateClassroom;
