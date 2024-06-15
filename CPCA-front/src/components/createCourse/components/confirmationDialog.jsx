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
    const [loading, setLoading] = useState(false)

    const { actionType, courseId, chapterId, lessonId, lessonIds, lessonItemId, showConfirmation, message } = useSelector(x => x.courseInputState.formState);

    const { mutateAsync: deleteLessonItem } = useDeleteLessonItem(lessonId)
    const { mutateAsync: deleteChapter } = useDeleteChapter(courseId, lessonIds)
    const { mutateAsync: deleteCourse } = useDeleteCourse(courseId)

    const actions = {
        deleteLessonItem: async () => await deleteLessonItem({ lessonId, lessonItemId, chapterId }),
        deleteChapter: async () => await deleteChapter({ courseId, chapterId, lessonIds })
    }

    const onSubmit = async () => {
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
                    await deleteCourse({ courseId })
                    break;
            }
            
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
            dispatch(close())
        }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${showConfirmation ? "" : "hidden"}`}>
            <div className="absolute inset-0 w-screen h-screen bg-black/25" />
            <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 scale-100 sm:scale-105 md:scale-100">
                <div className="relative w-full max-w-xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-b">
                            <span className="flex gap-2 items-center text-xl font-semibold capitalize text-red-500">
                                <TiWarningOutline size={30} />
                                <h1>Warning</h1>
                            </span>
                            <button onClick={() => dispatch(close())} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed capitalize text-gray-700">
                                {message} ?
                            </p>
                        </div>
                        <div className="flex gap-3 items-center p-4 rounded-b border-t">
                            <button onClick={onSubmit} type="button" className="w-full text-white capitalize bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                            <button onClick={() => dispatch(close())} type="button" className="w-full py-2.5 px-5 capitalize text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmation;
