import React, { useEffect, useState } from "react";
import { FormInput } from "../components";
import { SubmitBtn } from "../components";
import { Form, Link, redirect, useActionData, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";

export const action =
  (store) =>
  async ({ request }) => {
    // const navigate = useNavigate();
    // const location = useLocation();
    const formData = await request.formData();
    const data = Object.fromEntries(formData); // convert to plain js
    try {
      const result = await store
        .dispatch(api.endpoints.loginUser.initiate(data))
        .unwrap();
      if (result) {
        toast.success("User Logged in   successfully");
        // const email = params.get('email');
        // const params = new URLSearchParams(location.search);
        // const classroomId = params.get('classroomId');
        // const token = params.get('token');
        // if (email, classroomId, token) {
        //   navigate(`/join-class?email=${email}&classroomId=${classroomId}&token=${token}`);
        // } else {
        //   navigate("/courses");
        // }
        return redirect("/courses");
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err?.data?.msg || "Server Error. Please try again later.";
      toast.error(errorMessage);
    }
    console.log(data);
    return null;
  };

function Login() {
  // const [email, setEmail] = useState('');
  // const location = useLocation();

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const email = params.get('email');
  //   if (email) setEmail(email);
  // }, [location]);

  return (
    <section id="login" className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4 ">
          <SubmitBtn className="bg-green-2" text="login" />
        </div>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-green-1 capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Login;
