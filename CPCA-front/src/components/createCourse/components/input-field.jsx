import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../action.Types";
import { addChapter, addLesson, addQuiz, renameChapter, renameLesson } from "@/features/course/createCourse";
import { VscSaveAs } from "react-icons/vsc";
import * as yup from 'yup';

const nameSchema = yup.object({
    name: yup.string().trim().required('Name is required')
        .min(4, 'Name must be at least 4 characters long')
        .max(50, 'Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
});

export const Input = ({ close, id, lessonId, type, title, icon }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [name, setName] = useState(title ?? '');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await nameSchema.validate({ name });
            switch (type) {
                case ActionTypes.ADD_CHAPTER:
                    dispatch(addChapter({ name }));
                    break;
                case ActionTypes.ADD_LESSON:
                    dispatch(addLesson({ name, id }));
                    break;
                case ActionTypes.RENAME_CHAPTER:
                    dispatch(renameChapter({ name, id }));
                    break;
                case ActionTypes.RENAME_LESSON:
                    dispatch(renameLesson({ name, id, lessonId }));
                    break;
                case ActionTypes.ADD_TEST:
                    dispatch(addQuiz({ name, id }));
                    break;
                default:
                    break;
            }
            close();
            setName('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={close}></div>
            <form onSubmit={onSubmit} className="fixed inset-0 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                        {icon}
                        <div className="flex flex-col w-full">
                            <input
                                name="name"
                                ref={inputRef}
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-blue-500 block w-full p-2"
                                autoFocus
                            />
                            {error && <p className='text-red-500 text-xs animate-pulse mt-1'>{error}</p>}
                        </div>
                    </div>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                        <VscSaveAs />
                    </button>
                </div>
            </form>
        </>
    );
};
