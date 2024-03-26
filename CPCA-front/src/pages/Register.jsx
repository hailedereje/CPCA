import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { customFetch } from "../utils";



export const action = store => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(request);
  console.log("form data", formData);
  console.log(data);
  try {
    const response = await customFetch.post("/user/register", data);
    toast.success("account created successfully");
    return redirect("/login");
    // return null;
  } catch (error) {
    console.log(error)
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};


const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
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
