// src/pages/CreateClassroom.js
import { api } from "@/api";
import { FormInput, SectionTitle, SubmitBtn } from "@/components";
import CreateClassroomForm from "@/components/Classroom/CreateClassroomForm";
import React from "react";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
// import { api } from "../api";

export const createClassroomAction =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData); 
    console.log(data)// convert to plain js
    try {
      const result = await store
        .dispatch(api.endpoints.createClassroom.initiate(data))
        .unwrap(); // send a request to the server
      if (result) {
        toast.success("Classroom created successfully");
        return redirect("classrooms");
      }
    } catch (err) {
      console.log('error', err);
      const errorMessage =
        err?.data?.msg || "Server Error. Please try again later.";
      toast.error(errorMessage);
    }
    return null;
  };

function CreateClassroom() {
  return (
    <section id="create-classroom" className="h-screen grid  w-full ">
      <Form
        method="post"
        className="card p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <SectionTitle text={"Create Classroom"} />
        <div className="w-[70%] ">
          <CreateClassroomForm type="text" label="Name" name="name" />
          <CreateClassroomForm
            type="text"
            label="Description"
            name="description"
          />
          <CreateClassroomForm type="text" label="Course ID" name="courseId" />
          <div className="mt-4  ">
            <SubmitBtn
              className="bg-green-2 btn btn-secondary"
              text="Create Classroom"
            />
          </div>
        </div>
      </Form>
    </section>
  );
}

export default CreateClassroom;
