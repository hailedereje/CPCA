import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const CourseName = ({ courseId }) => {
    const client = useQueryClient();
    const course = client.getQueryData(['course', courseId]).data.course
    const [title,setTitle] = useState(course.title)
    const [isEditing,setIsEditing] = useState(false)

    // const { mutateAsync: postCourseName, isPending } = useMutation({
    //     mutationFn: addCourseName,
    //     onSuccess: () => {
    //         client.invalidateQueries({ queryKey: ['course', courseId] })
    //     }
    // })
    // const onSubmite = async () => {
    //     await postCourseName({ courseId, courseName }).then((result) => {
    //         console.log(result)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // <div className="flex max-h-20  items-end  gap-4 bg-slate-50 p-4 rounded-md dark:bg-gray-600">
    //         <input type="text" value={data.data.course.title} className="outline-none border rounded-md w-full dark:text-white dark:bg-transparent ps-2 p-2 text-sm" />
    //         <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"> save</button>
    //         <button className="bg-red-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"> delete</button>
    //     </div>
    return (
        <div className="flex flex-col max-w-md items-start w-full gap-4 bg-slate-50 p-4 rounded-md dark:bg-gray-600">
            <span className="flex flex-col gap-2">
                <span className="text-xl capitalize font-medium flex gap-4 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <path fill="currentColor" fill-rule="evenodd" d="M3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h5.25a.75.75 0 0 1 0 1.5H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6.25a.75.75 0 0 1-1.5 0V3a.5.5 0 0 0-.5-.5zm12.28 8.72a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.97-1.97a.75.75 0 0 1 1.06 0M4.75 4a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zM4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8m.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    <span >Course Name</span>
                </span>
                <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-gray-200">
                    Specify the name of the course. This will be the title of the course that students will see.
                </span>
            </span>
            {!isEditing && <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{title}</span>
                <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
                    {isEditing ? "cancel" : "edit"}
                </button>
            </div>}
            {isEditing && <div className="flex flex-col gap-2 w-full">
                <div className="w-full">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="max-w-sm outline-none border rounded-md w-full dark:text-white dark:bg-transparent ps-2 p-2 text-sm" />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className="bg-red-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
                        cancel
                    </button>
                    <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2">
                        save
                    </button>
                </div>
            </div>} 
        </div>
    )
}