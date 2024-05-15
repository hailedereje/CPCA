import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { store } from "@/store";
import { toast } from "react-toastify";
import { api } from "@/api";
import { useState } from "react";
import {createCourse} from "@/features/course/createCourse";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

const courseSchema = yup.object({
    title: yup.string().trim().min(6, "Use a descriptive name with more than 6 characters").max(30, "Maximum characters reached"),
    author: yup.string().min(5, 'Author name should be at least 3 characters long').max(20, 'Author name should not exceed 50 characters'),
    duration: yup.number().required("expected course duration expected"),
    level: yup.string().required().oneOf(["BEGINER", "INTERMEDIATE", "ADVANCED"]),
})

export const CreateCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { course,draftCourses } = useSelector(x => x.createCourseState)

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(courseSchema) })
    
    const onSubmite = async (data) =>{
        try {
            const result = await store.dispatch(api.endpoints.createCourse.initiate(data)).unwrap();
            if(result) {
                const {course} = result
                toast.success("course created successfully")
                dispatch(createCourse({course}))
                navigate(`update/${course._id}`)
            }
        }catch (err) {
            console.log(err)
            const errMessage = err?.data?.msg || "server Error . please try again"
            toast.error(errMessage)
        } 
    }
    const { errors ,isSubmitting ,} = formState

    return (
        <form 
            onSubmit={handleSubmit(onSubmite)} 
            className="w-full h-full max-w-2xl max-h-xl border rounded-lg p-5">
            <h2 className="text-4xl font-semibold mb-6">Create a New Course</h2>
            <div  className="space-y-4 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                    <div className='basis-1/2'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">name</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            {...register('title')}
                            className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        />
                        <p className='text-red-500 text-xs'>{errors.title?.message || ""}</p>
                    </div>
                    <div className='basis-1/2'>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            {...register("author")}
                            className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        />
                        <p className='text-red-500 text-xs'>{errors.author?.message || ""}</p>
                    </div>
                </div>

                <div className="w-full flex items-start justify-between gap-3">
                    <div className='basis-1/2'>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                        <select
                            name="duration"
                            id="duration"
                            {...register("duration")}
                            className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                        <option value="">Select duration</option>
                            <option value={1}>1 month</option>
                            <option value={2}>2 month </option>
                            <option value={3}>3 month</option>
                            <option value={4}>4 month</option>
                        </select>
                        <p className='text-red-500 text-xs'>{errors.duration?.message || ""}</p>
                    </div>
                    <div className='basis-1/2'>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                        <select
                            name="level"
                            id="level"
                            {...register("level")}
                            className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                            <option value="">Select Level</option>
                            <option value="BEGINER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                        <p className='text-red-500 text-xs'>{errors.level?.message || ""}</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isSubmitting ? <AiOutlineLoading3Quarters className='animate-spin' /> : <span>Create Course</span>}
                </button>
            </div>
        </form>
    );
};


