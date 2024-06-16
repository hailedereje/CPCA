import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import SVGImage from '@/assets/login.jpg'; // Add your SVG image here
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';
import { BiHide } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { useLoginUserMutation } from '@/api';

// Define the validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(5, 'Password must be at least 6 characters').required('Password is required'),
});

function Login() {
  const { control, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ resolver: yupResolver(schema), });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation(); // Use the mutation hook

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      toast.success("User Logged in successfully");
      dispatch(setUser(response));
      redirect('/dashboard');
    } catch (error) {
      toast.error("Error logging in");
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
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="absolute top-3 right-0 pr-3 flex items-center text-sm leading-5">
                      <button
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <BiHide className="h-5 w-5 text-gray-500" />
                        ) : (
                          <GrView className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
              )}
            />
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
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
