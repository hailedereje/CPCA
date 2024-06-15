import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import newRequests from '@/utils/newRequest';
import { showErrorToast, showSuccessToast } from '@/toasts/toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';
import { BiHide } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';

// Define the validation schema using yup
const schema = yup.object().shape({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


function Register() {
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const params = useParams();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: registerUser, isPending } = useMutation({
    mutationFn: (data) => newRequests.post('/user/register', data),
    onSuccess: (data) => {
      showSuccessToast('User Registered successfully');
      if (params.token) {
        redirect(`/join/${params.token}`);
      } 
      navigate('/login');
    },
    onError: (error) => {
      console.log(error)
      showErrorToast(error.response.data.msg);
    },
  });

  useEffect(() => {
    const findEmail = async () => {
      try {
        const response = await newRequests.get(`/classroom/invitation/${params.token}`);
        setEmail(response.data.email);
        reset({ email: response.data.email });
      } catch (err) {
        console.log(err);
      }
    };
    if (params.token) {
      findEmail();
    }
  }, [params, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data)
      await registerUser(data);
    } catch (error) {
      console.log('Error registering:', error);
    }
  };

  return (
    <section id="register" className="h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full p-8 flex flex-col justify-center">
          <h4 className="text-center text-3xl font-bold mb-4">Register</h4>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    {...field}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    {...field}
                    defaultValue={email}
                    readOnly={!!params.token}
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
                <div className="flex flex-col gap-2">
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
            <p className="text-center mt-4">
              Already a member?{' '}
              <Link to="/login" className="ml-2 text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
