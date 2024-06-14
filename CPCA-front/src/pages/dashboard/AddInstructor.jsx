import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import newRequests from "@/utils/newRequest.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/toasts/toast";

// Validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const AddInstructorForm = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });
  const client = useQueryClient();

  const {mutateAsync: postInstructor,isPending } = useMutation({
    mutationFn: (data) => newRequests.post("/user/create-instructor", data),
    onSuccess: () => {
      reset();
      setPopupOpen(false);
      showSuccessToast("Instructor added successfully");
      client.invalidateQueries({
        predicate: (query) => {
          console.log( query.queryKey[0] === "users")
          return query.queryKey[0] === "users"
        },
      })
    },
    onError: (error) => {
      showErrorToast("Error adding instructor")
    },
  })

  const onSubmit = async (data) => {
    try {
      await postInstructor(data);
    } catch (error) {
      console.log("Error adding instructor:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setPopupOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
        onClick={() => setPopupOpen(!isPopupOpen)}
      >
        <AiOutlinePlus className="h-6 w-6 mr-2" />
        Add Instructor
      </button>
      {isPopupOpen && (
        <div className="fixed w-screen h-screen z-50 inset-0 overflow-y-auto flex items-center justify-center bg-black/50">
          <div className="z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <span
              className="absolute top-2 right-2 text-2xl text-red-500 cursor-pointer"
              onClick={handleCancel}
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Instructor</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-400'}`}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-400'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-400'}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:shadow-outline-blue"
                >
                  {isPending ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-100 transition duration-300 focus:outline-none focus:shadow-outline-red"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInstructorForm;
