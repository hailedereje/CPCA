import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createCourse } from '@/features/course/newCourseSlice';
import { createCourseAction } from "@/actions/courseAction";

const courseSchema = yup.object({
    name: yup.string().trim().min(6, "Use a descriptive name with more than 6 characters").max(20, "Maximum characters reached"),
    author: yup.string().min(5, 'Author name should be at least 3 characters long').max(20, 'Author name should not exceed 50 characters'),
    duration: yup.number().required("expected course duration expected"),
    level: yup.string().required('Level is required')
})

export const CreateCourse = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(courseSchema) })
    
    const onSubmite = async (data) =>{
        try {
            await createCourseAction(data)
            dispatch(createCourse({data}))
        }catch(err) {
            console.error(err?.message)
        }
        
    }
    const { isLoading, errors } = formState

    return (
        <form onSubmit={handleSubmit(onSubmite)} className="w-full h-full max-w-2xl max-h-xl border rounded-lg p-6 mb-20">
            <h2 className="text-4xl font-semibold mb-6">Create a New Course</h2>
            <div  className="space-y-4 flex flex-col h-full w-full">
                <div className="flex items-start justify-between gap-3">
                    <div className='basis-1/2'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">name</label>
                        <input
                            type="text"
                            name="name"
                            id="title"
                            {...register('name')}
                            className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        />
                        <p className='text-red-500 text-xs'>{errors.name?.message || ""}</p>
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
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <p className='text-red-500 text-xs'>{errors.level?.message || ""}</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : <span>Create Course</span>}
                </button>
            </div>
        </form>
    );
};


const tagList = [
    { id: "tag1", name: "Programming" },
    { id: "tag2", name: "Web Development" },
    { id: "tag3", name: "Data Science" },
    { id: "tag4", name: "Machine Learning" },
    { id: "tag5", name: "Cybersecurity" },
    { id: "tag6", name: "Database Management" },
    { id: "tag7", name: "Software Engineering" },
    { id: "tag8", name: "Mobile Development" },
    { id: "tag9", name: "Artificial Intelligence" },
    { id: "tag10", name: "Cloud Computing" }
  ];

  const courseList = [
    { id: "course1", name: "Advanced Programming Course" },
    { id: "course2", name: "Introductory Web Development Course" },
    { id: "course3", name: "Intermediate Data Science Course" },
    { id: "course4", name: "Fundamental Machine Learning Course" },
    { id: "course5", name: "Practical Cybersecurity Course" },
    { id: "course6", name: "Theoretical Database Management Course" },
    { id: "course7", name: "Applied Programming Course" },
    { id: "course8", name: "Advanced Web Development Course" },
    { id: "course9", name: "Introductory Data Science Course" },
    { id: "course10", name: "Intermediate Machine Learning Course" }
];