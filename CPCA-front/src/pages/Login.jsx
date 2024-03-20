import React from "react";
import { FormInput } from "../components";
import { SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);
    const data = Object.fromEntries(formData); // convert to plain js
    try {
      const response = await customFetch.post("/user/login", data);
      console.log(response.data);
      store.dispatch(loginUser(response.data));
      toast.success("User Logged In successfully");
      return redirect('/')
    } catch (err) {
      const errorMessage = err?.response?.data?.msg || 'check your credentials';
      console.log(errorMessage); 
      toast.error(errorMessage);
    }
    // console.log(data);
    return null;
  };

function Login() {
  const navigate = useNavigate();

  const loginAsGuestUser = () => {};

  const handleSumbit = (e) => {
    e.preventDefault();
    navigate("/dashboard", { replace: true });
    console.log("login clicked");
  };

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
