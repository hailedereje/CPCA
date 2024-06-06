import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "@/utils/newRequest";
import { useCreateCourse } from "./hooks/course-hooks";

const courseSchema = yup.object({
    title: yup.string().trim().min(6, "Use a descriptive name with more than 6 characters").max(30, "Maximum characters reached"),
    author: yup.string().min(5, 'Author name should be at least 3 characters long').max(20, 'Author name should not exceed 50 characters'),
    duration: yup.number().required("expected course duration expected"),
    level: yup.string().required().oneOf(["BEGINER", "INTERMEDIATE", "ADVANCED"]),
})

export const CreateCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client = useQueryClient();
    
    
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(courseSchema) })

    const {mutateAsync:postCourse,isPending } = useCreateCourse()

    const onSubmite =  async (formData) =>{
        await postCourse(formData).then((result) => {
            const { id } = result.data
            toast.success("course created successfully")
            navigate(`/dashboard/course/update/${ id }`)
        }).catch(err => {
            console.log(err.response.data)
        })    
    }
    const { errors ,isSubmitting ,} = formState

    return (
        <div className="flex w-full justify-center">
            <form 
                onSubmit={handleSubmit(onSubmite)} 
                className="w-full h-fit max-w-2xl max-h-xl rounded-lg p-5 dark:text-white space-y-10">
                <h2 className="text-4xl font-semibold">Create a New Course</h2>
                <div  className="space-y-4 flex flex-col">
                    <div className="flex w-full items-start justify-between xxs:flex-col sm:flex-row gap-3">
                        <div className='w-full'>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                {...register('title')}
                                className="dark:bg-transparent mt-1 p-2 w-full text-sm border border-gray-300 rounded-md dark:text-white  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark "
                            />
                            <p className='text-red-500 text-xs'>{errors.title?.message || ""}</p>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-white">Author</label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                {...register("author")}
                                className="dark:bg-transparent mt-1 p-2 w-full text-sm border border-gray-300 rounded-md dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            />
                            <p className='text-red-500 text-xs'>{errors.author?.message || ""}</p>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-between gap-3 xxs:flex-col sm:flex-row">
                        <div className='w-full'>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-white">Duration</label>
                            <select
                                name="duration"
                                id="duration"
                                {...register("duration")}
                                className="dark:bg-transparent select w-full text-sm border border-gray-300 rounded-md dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            >
                                <option className="text-black" value={1} defaultChecked>1 month</option>
                                <option className="text-black" value={2}>2 month </option>
                                <option className="text-black" value={3}>3 month</option>
                                <option className="text-black" value={4}>4 month</option>
                            </select>
                            <p className='text-red-500 text-xs'>{errors.duration?.message || ""}</p>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-white">Level</label>
                            <select
                                name="level"
                                id="level"
                                {...register("level")}
                                className="dark:bg-transparent select  w-full text-sm border border-gray-300 rounded-md dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            >
                                <option className="text-black" value="BEGINER" defaultChecked>Beginner</option>
                                <option className="text-black" value="INTERMEDIATE">Intermediate</option>
                                <option className="text-black" value="ADVANCED">Advanced</option>
                            </select>
                            <p className='text-red-500 text-xs'>{errors.level?.message || ""}</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1  focus:ring-indigo-500"
                    >
                        {isPending ? <AiOutlineLoading3Quarters className='animate-spin' /> : <span>Create Course</span>}
                    </button>
                </div>
            </form>
        </div>
    );
};


