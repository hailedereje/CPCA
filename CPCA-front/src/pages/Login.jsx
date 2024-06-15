import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../api';
import SVGImage from '@/assets/login.jpg'; // Add your SVG image here
import { useMutation } from '@tanstack/react-query';
import newRequests from '@/utils/newRequest';
import { showErrorToast, showSuccessToast } from '@/toasts/toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';

// Define the validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(5, 'Password must be at least 6 characters').required('Password is required'),
});


function Login() {
  const { control, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ resolver: yupResolver(schema), });
  const dispatch = useDispatch();

  const { mutateAsync: postUser, isPending } = useMutation({
    mutationFn: (data) => newRequests.post("/user/login", data),
    onSuccess: (data) => {
      showSuccessToast("User Logged in successfully");
      dispatch(setUser(data.data));
      redirect('/dashboard');
    },
    onError: (error) => {
      showErrorToast("Error logging in")
    }
  })

  const onSubmit = async (data) => {
    try {
      await postUser(data);
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };
  return (
    <section id="login" className="h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={SVGImage} alt="Login illustration" className="object-cover w-full h-full" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h4 className="text-center text-3xl font-bold mb-4">Login</h4>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    {...field}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    {...field}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
              )}
            />
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <p className="text-center">
              Not a member yet?{' '}
              <Link to="/register" className="ml-2 text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
