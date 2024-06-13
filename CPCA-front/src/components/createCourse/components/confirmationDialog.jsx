import { close } from "@/features/course/coursSidebarSlice";
import { TiWarningOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteChapter, useDeleteCourse, useDeleteLessonItem } from "../hooks/course-hooks";
import { useState } from "react";
import { ActionTypes } from "../action.Types";
import { showSuccessToast } from "@/toasts/toast";
import { useNavigate, useParams } from "react-router-dom";

export const Confirmation = () => {
    const param = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false)

    const { actionType, courseId, chapterId,lessonId,lessonIds,lessonItemId,showConfirmation, message } = useSelector(x => x.courseInputState.formState);
    const data = useSelector(x => x.courseInputState.formState)

    const {mutateAsync: deleteLessonItem } = useDeleteLessonItem(lessonId)
    const {mutateAsync: deleteChapter } = useDeleteChapter(courseId,lessonIds)
    const {mutateAsync: deleteCourse } = useDeleteCourse(courseId)

    const actions = {
        deleteLessonItem: async() => await deleteLessonItem({lessonId,lessonItemId}),
        deleteChapter: async() => await deleteChapter({courseId,chapterId,lessonIds}) 
    }
    const onSubmit = async() => {
        try {
            setLoading(true)
            switch (actionType) {
                case ActionTypes.DELETE_LESSON_ITEM:
                    await actions.deleteLessonItem()
                    break
                case ActionTypes.DELETE_CHAPTER:
                    await actions.deleteChapter()
                    navigate('')
                    break
                case ActionTypes.DELETE_COURSE:
                    await deleteCourse({courseId})
                    break;
            }
        }catch(err) {
            console.log(err)
        }finally {
            setLoading(false)
            dispatch(close())
        }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${showConfirmation ? "" : "hidden"}`}>
            <div className="absolute inset-0 w-screen h-screen bg-black/25" />
            <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 scale-100 sm:scale-105 md:scale-100">
                    <div class="relative  w-full max-w-xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow">
                            <div class="flex items-center justify-between p-4 md:p-5 rounded-t ">
                                <span class="flex gap-2 items-end text-xl font-semibold capitalize text-red-500">
                                    <TiWarningOutline size={30}/>
                                    <h1>warning</h1>
                                </span>
                                <button onClick={() => dispatch(close())} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5 space-y-4">
                                <p class="text-base leading-relaxed  capitalize">
                                    {message} ?
                                </p>
                            </div>
                            <div class="flex gap-3 items-center p-4  rounded-b ">
                                <button onClick={onSubmit}  type="button" class="text-white capitalize bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{loading ? "deleting": "delete"}</button>
                                <button onClick={() => dispatch(close())}  type="button" class="py-2.5 px-5 capitalize ms-3 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-100  dark:text-red-400 ">cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

