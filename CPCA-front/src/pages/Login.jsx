import React, { useEffect } from "react";
import { FormInput } from "../components";
import { SubmitBtn } from "../components";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData); // convert to plain js
    try {
      const result = await store
        .dispatch(api.endpoints.loginUser.initiate(data))
        .unwrap();
      console.log(result);
      if (result) {
        toast.success("User Logged in   successfully");
        return redirect("/dashboard");
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
  const actionData = useActionData();
  console.log(actionData);
  const loginAsGuestUser = () => {};

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Login;
