import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../action.Types";
import { addChapter, addLesson, renameChapter, renameLesson } from "@/features/course/createCourse";
import { MdOutlineDownloadDone } from "react-icons/md";
import * as yup from 'yup'

const nameSchema = yup.object({
    name: yup.string().trim().required('Name is required')
        .min(4, 'Name must be at least 4 characters long')
        .max(50, 'Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
});

export const Input = ({ close, id, lessonId, type, title, icon }) => {

    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const outsideRef = useRef(null)

    const [name, setName] = useState(title ?? '')
    const [error, setError] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();
        await nameSchema.validate({ name }).then(() => {
            setError("")
            switch (type) {
                case ActionTypes.ADD_CHAPTER:
                    dispatch(addChapter({ name }))
                    break;
                case ActionTypes.ADD_LESSON:
                    dispatch(addLesson({ name, id }))
                    break;
                case ActionTypes.RENAME_CHAPTER:
                    dispatch(renameChapter({ name, id }))
                    break;
                case ActionTypes.RENAME_LESSON:
                    dispatch(renameLesson({ name, id, lessonId }))
                    break;
            }
            close()
        }).catch(err => setError(err.message))
    }

    const handleClickOutside = (event) => {
        if (outsideRef.current && !outsideRef.current.contains(event.target)) close()
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        if (inputRef.current) {
            inputRef.current.focus();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [close, inputRef]);


    return (
        <form onSubmit={onSubmit}
            ref={outsideRef}
            className={`w-fit flex justify-start gap-2 p-2`}>
            <div className="flex items-center gap-3">
                {icon}
                <div className="flex-flex-col">
                    <input
                        name="name"
                        ref={inputRef}
                        type="text" id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-blue-500 block w-full pe-10 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <p className='text-red-500 text-xs animate-pulse'>{error}</p>
                </div>

            </div>
            <button type="submit" hidden>
                <MdOutlineDownloadDone size={20} />
            </button>
        </form>
    )
}