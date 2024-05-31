import { Form, Link, redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { api } from "../api";
import { useEffect, useState } from "react";
import newRequests from "@/utils/newRequest";

export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData); // convert to plain js
    console.log(data);
    try {
      const result = await store
        .dispatch(api.endpoints.registerUser.initiate(data))
        .unwrap();
      if (result) {
        toast.success("User Registered  successfully");
        if(params.token){
          return redirect(`/join/${params.token}`);
        }
        return redirect("/login");
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

const Register = () => {
  const [email, setEmail] = useState('');
  const params = useParams();

  useEffect(() => {
    const findEmail = async () => {
      try {
        const response = await newRequests.get(`/classroom/invitation/${params.token}`);
        setEmail(response.data.email);
      } catch (err) {
        console.log(err);
      }
    }
    findEmail();
  }, [params]);

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        {params.token && (
          <p className="text-center text-sm text-red-500">
            You have been invited to join a class. Please register to join the class.
          </p>
        )}
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" defaultValue={email} />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
