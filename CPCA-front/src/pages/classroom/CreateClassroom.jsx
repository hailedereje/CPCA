// src/pages/CreateClassroom.js
import { api, useGetAllCoursesQuery } from "@/api";
import { SectionTitle, SubmitBtn } from "@/components";
import CreateClassroomForm from "@/components/Classroom/CreateClassroomForm";
import { Loading } from "react-daisyui";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";

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
  const { data: courses, isLoading: isCoursesLoading } =
    useGetAllCoursesQuery();

  if (isCoursesLoading) {
    return <Loading />;
  }

  return (
    <section id="create-classroom" className="h-screen grid w-full">
      <Form
        method="post"
        className="card p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <SectionTitle text={"Create Classroom"} />
        <div className="w-[70%] ">
          <CreateClassroomForm type="text" label="Name" name="name" />
          <CreateClassroomForm type="text" label="Description" name="description" />
          <div className="form-control mt-5">
            <label htmlFor="courseId" className="label">
              <span className="label-text capitalize">Course</span>
            </label>
            <select id="courseId" name="courseId" className="select select-bordered select-text capitalize">
              <option key={"0"} className="capitalize" value="">Select a course</option>
              {courses.map((course) => (
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
