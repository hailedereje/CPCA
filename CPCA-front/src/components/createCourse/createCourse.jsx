import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequests from "@/utils/newRequest";
import { useCreateCourse, useUpdateCourse } from "./hooks/course-hooks";
import { IconWrapper } from "./components/icon-wrapper";
import { FaFile } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { PiStepsFill } from "react-icons/pi";
import { IoIosTimer } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";

const courseSchema = yup.object({
    title: yup.string().trim().min(6, "Use a descriptive name with more than 6 characters").max(30, "Maximum characters reached"),
    author: yup.string().min(5, 'Author name should be at least 3 characters long').max(20, 'Author name should not exceed 50 characters'),
    duration: yup.number().required("expected course duration expected"),
    level: yup.string().required().oneOf(["BEGINER", "INTERMEDIATE", "ADVANCED"]),
})

export const CreateCourse = () => {

    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(courseSchema) })
    const {mutateAsync:postCourse,isPending } = useCreateCourse()

    const onSubmite =  async (formData) =>{
        await postCourse(formData)  
    }
    const { errors ,isSubmitting ,} = formState

    return (
        <div className="flex w-full justify-center">
            <form 
                onSubmit={handleSubmit(onSubmite)} 
                className="w-full h-fit  max-w-2xl max-h-xl rounded-lg p-5 dark:text-white space-y-10">
                <h2 className="text-4xl font-semibold">Create a New Course</h2>
                <div  className="space-y-4 flex flex-col">
                    <div className="flex w-full items-start justify-between xxs:flex-col sm:flex-row gap-3">
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<MdOutlineTitle size={15} />} />
                                <span className="text-blue-500">Title</span>
                                </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                {...register('title')}
                                className="dark:bg-transparent mt-1 p-2 w-full text-sm border border-gray-300 rounded-md text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark "
                            />
                            <p className='text-red-500 text-xs'>{errors.title?.message || ""}</p>
                        </div>
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<GrUserManager size={15} />} />
                                <span className="text-blue-500">Author</span>
                                </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                {...register("author")}
                                className="dark:bg-transparent mt-1 p-2 w-full text-sm border border-gray-300 rounded-md text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            />
                            <p className='text-red-500 text-xs'>{errors.author?.message || ""}</p>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-between gap-3 xxs:flex-col sm:flex-row">
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<IoIosTimer size={15} />} />
                                <span className="text-blue-500">Duration</span>
                                </label>
                            <select
                                name="duration"
                                id="duration"
                                {...register("duration")}
                                className="dark:bg-transparent select w-full text-sm border border-gray-300 rounded-md text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            >
                                <option className="text-black" value={1} defaultChecked>1 month</option>
                                <option className="text-black" value={2}>2 month </option>
                                <option className="text-black" value={3}>3 month</option>
                                <option className="text-black" value={4}>4 month</option>
                            </select>
                            <p className='text-red-500 text-xs'>{errors.duration?.message || ""}</p>
                        </div>
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<PiStepsFill size={15}/>} />
                                <span className="text-blue-500">Level</span>
                                </label>
                            <select
                                name="level"
                                id="level"
                                {...register("level")}
                                className="dark:bg-transparent select  w-full text-sm border border-gray-300 rounded-md text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
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
                        className="w-full flex items-center justify-center max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-1  focus:ring-indigo-500"
                    >
                        {isPending ? <AiOutlineLoading3Quarters className='animate-spin' /> : <span>Create Course</span>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export const UpdatebasicInFormation = ({courseId,initialData}) => {
    const {title,author,duration,level} = initialData
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(courseSchema),defaultValues:{title,author,duration,level} })

    const {mutateAsync:putCourse,isPending } = useUpdateCourse(courseId)

    const onSubmite =  async (formData) =>{
        await putCourse({courseId,data:formData})  
    }
    const { errors ,isSubmitting ,isDirty } = formState

    return (
        <div className="flex w-full border">
            <form 
                onSubmit={handleSubmit(onSubmite)} 
                className="w-full h-fit  max-w-2xl max-h-xl rounded-lg p-5 space-y-10">
                <div  className="space-y-4 flex flex-col">
                    <div className="flex w-full items-start justify-between xxs:flex-col sm:flex-row gap-3">
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<MdOutlineTitle size={15} />} />
                                <span >Title</span>
                                </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                {...register('title')}
                                className=" mt-1 p-2 w-full text-sm border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark "
                            />
                            <p className='text-red-500 text-xs'>{errors.title?.message || ""}</p>
                        </div>
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<GrUserManager size={15} />} />
                                <span >Author</span>
                                </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                {...register("author")}
                                className="dark:bg-transparent mt-1 p-2 w-full text-sm border  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            />
                            <p className='text-red-500 text-xs'>{errors.author?.message || ""}</p>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-between gap-3 xxs:flex-col sm:flex-row">
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<IoIosTimer size={15} />} />
                                <span >Duration</span>
                                </label>
                            <select
                                name="duration"
                                id="duration"
                                {...register("duration")}
                                className="dark:bg-transparent select w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            >
                                <option className="text-black" value={1} defaultChecked>1 month</option>
                                <option className="text-black" value={2}>2 month </option>
                                <option className="text-black" value={3}>3 month</option>
                                <option className="text-black" value={4}>4 month</option>
                            </select>
                            <p className='text-red-500 text-xs'>{errors.duration?.message || ""}</p>
                        </div>
                        <div className='w-full space-y-4'>
                            <label className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" size={5} icon={<PiStepsFill size={15}/>} />
                                <span >Level</span>
                                </label>
                            <select
                                name="level"
                                id="level"
                                {...register("level")}
                                className="dark:bg-transparent select  w-full text-sm border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
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
                        disabled={!isDirty}
                        className="w-full flex items-center justify-center max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1  focus:ring-indigo-500"
                    >
                        {isPending ? <AiOutlineLoading3Quarters className='animate-spin' /> : <span>Update Course</span>}
                    </button>
                </div>
            </form>
        </div>
    );
};




