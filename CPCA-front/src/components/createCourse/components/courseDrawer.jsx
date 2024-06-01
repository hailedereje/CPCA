import { addChapter, addLesson, close, deleteChapterConfirmation, openConfirmationDialog, renameChapter, setActiveLesson, setTitle } from '@/features/course/coursSidebarSlice';
import React, { useState } from 'react';

import { FaBook, FaBookOpen, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdList } from 'react-icons/io';
import { MdAdd, MdModeEditOutline } from 'react-icons/md';
import { TiWarningOutline } from "react-icons/ti";
import { RiDeleteBin6Line, RiQuestionAnswerLine } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup"
import { ActionTypes } from '../action.Types';
import { useCreateChapter, useCreateLesson, useRenameChapter } from '../hooks/course-hooks';
import { Confirmation } from './confirmationDialog';
import { BsQuestionOctagonFill } from 'react-icons/bs';

const deleteMessage = "The chapter and its corresponding lessons will be removed.This means that both the main section of the material (the chapter) and all the associated lessons that explain or expand on that chapter will no longer be available."

export const Drawer = ({ data }) => {
    const navigate = useNavigate()
    const course = data
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(true);
    const [openChapterIndex, setOpenChapterIndex] = useState(null);

    const toggleChapter = (index) => {
        if (openChapterIndex === index) {
            setOpenChapterIndex(null);
        } else {
            setOpenChapterIndex(index);
        }
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            <PopupForm />
            <Confirmation />
            <div
                className={`fixed inset-0 z-10 ${isOpen ? "" : "hidden"}`}
                onClick={toggleDrawer}
            ></div>
            <div className={` fixed top-12 h-full left-0 bg-white dark:bg-gray-600 dark:text-white w-80 z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`} >
                <div className="w-full">
                    <div className="bg-white h-screen max-h-[1024px] dark:bg-gray-600 shadow-lg overflow-auto editor">
                        <div className="flex justify-between gap-2 items-center p-4 bg-blue-500 text-white">
                            <h2 className="text-md flex items-center line-clamp-1 gap-2">
                                <span><FaBook className="text-md" /> </span>
                                <p className='text-left line-clamp-2'>{course.title}</p>
                            </h2>
                            <div className="relative group w-max mx-auto">
                                <button
                                    onClick={() => dispatch(addChapter({ courseId: course._id, label: "create Chapter", actionType: ActionTypes.ADD_CHAPTER }))}
                                    className="focus:outline-none"
                                >
                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M5 19V5h7v7h7v1c.7 0 1.37.13 2 .35V9l-6-6H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h8.35c-.22-.63-.35-1.3-.35-2zm9-14.5l5.5 5.5H14zM23 18v2h-3v3h-2v-3h-3v-2h3v-3h2v3z" />
                                    </svg>
                                </button>
                                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 w-max bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Add Chapter
                                </span>
                            </div>
                        </div>
                        <div className="p-4 mb-10">
                            {course.chapters.map((chapter, index) => (
                                <div key={chapter._id} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-start gap-2 p-2 bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-200 transition duration-300" >
                                        <button className="flex items-start gap-2 w-full p-2" onClick={() => toggleChapter(index)}>
                                            <span className=''>
                                                {openChapterIndex === index ? <FaBookOpen className="text-md" /> : <FaBook className="text-md" />}
                                            </span>
                                            <span className="text-sm dark:text-white  capitalize line-clamp-2 text-left">{chapter.title+'('+chapter.lessons.length+')'}</span>
                                        </button>
                                        <Menu ids={{ courseId: course._id, chapterId: chapter._id }} value={chapter.title} />
                                    </div>
                                    <div className={`${openChapterIndex === index ? "" : "hidden"}`}>
                                        <Lessons courseId={course._id} chapterId={chapter._id} lessons={chapter.lessons} />
                                        <div
                                            onClick={() => {
                                                navigate(`${chapter._id}/add-test/${chapter.quiz._id}`)
                                            }}
                                            key={chapter.quiz?._id}
                                            className={`flex items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300 ${!!chapter.quiz?._id ? "":"hidden"}`}
                                        >
                                            <div className='flex gap-2 ml-2'>
                                            <span>
                                                <BsQuestionOctagonFill />
                                            </span>
                                                <span className="text-sm line-clamp-1 capitalize font-semibold">{chapter.quiz?.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={toggleDrawer} className="absolute top-1/2 -right-10 rounded p-2 bg-black/25">
                    {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button>
            </div>
        </div>
    );
};

const Lessons = ({ courseId, lessons, chapterId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="ml-2 space-y-2 transition duration-300">
            {
                lessons.length === 0 ? <span className='text-xs pl-5 dark:text-gray-400'>no lessons create one</span> : lessons.map((lesson) => (
                <div
                    onClick={() => {
                        dispatch(setActiveLesson({ courseId, chapterId, lessonId: lesson._id, content: lesson.content }))
                        navigate(`${chapterId}/lessons/${lesson._id}`)
                    }}
                    key={lesson._id}
                    className="flex items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
                >
                    <div className='flex gap-2'>
                        <span>
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4 21V3h14v8.735q-.22-.031-.5-.031t-.5.03V4h-5.5v6.192L9.5 9l-2 1.192V4H5v16h6.992q.073.27.201.528q.128.259.288.472zm13.5.692q-1.671 0-2.835-1.164q-1.165-1.164-1.165-2.836q0-1.67 1.165-2.835q1.164-1.165 2.835-1.165t2.836 1.165t1.164 2.835t-1.164 2.836t-2.836 1.164m-.865-2.115l2.73-1.923l-2.73-1.923zM7.5 4h4zM5 4h12h-5.5h.492z" />
                            </svg>
                        </span>
                        <span className="text-sm line-clamp-1 capitalize">{lesson.title}</span>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

const Menu = ({ ids, value }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return (
        <div className="relative inline-block">
            <button className="z-20" onClick={() => setIsMenuOpen(prev => !prev)}>
                <SlOptions size={20} />
            </button>
            {isMenuOpen && (
                <div className="fixed h-screen w-screen inset-0 z-30 cursor-default" onClick={() => setIsMenuOpen(false)}></div>
            )}
            {isMenuOpen && (
                <div className="absolute top-10 right-0 w-48 bg-white border-gray-200 z-30 rounded shadow-lg dark:bg-gray-700 dark:text-white">
                    <ul className="list-none p-0 m-0">
                        <li
                            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                            onClick={() => {
                                dispatch(renameChapter({ ...ids, label: "rename chapter", actionType: ActionTypes.RENAME_CHAPTER, value }))
                                setIsMenuOpen(false)
                            }}
                        >
                            <span className="mr-2"><MdModeEditOutline /></span>
                            <span className='text-sm capitalize'>rename</span>
                        </li>

                        <li
                            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                            onClick={() => {
                                dispatch(addLesson({ ...ids, label: "add lesson", actionType: ActionTypes.ADD_LESSON, value }))
                                setIsMenuOpen(false)
                            }}
                        >
                            <span className="mr-2"><IoMdAddCircleOutline /></span>
                            <span className='text-sm capitalize'>add lesson </span>
                        </li>
                        <li
                            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                            onClick={() => {
                                navigate(`${ids.chapterId}/add-test`)
                                setIsMenuOpen(false)
                            }}
                        >

                            <span className="mr-2"><RiQuestionAnswerLine /></span>
                            <span className='text-sm capitalize'>add quiz</span>
                        </li>

                        {/* <li
                            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="mr-2"><IoMdList /></span>
                            <span className='text-sm capitalize'>view quiz</span>
                        </li> */}

                        <li
                            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                            onClick={() => {
                                dispatch(openConfirmationDialog({ ...ids, message: deleteMessage, actionType: ActionTypes.DELETE_CHAPTER, value }))
                                setIsMenuOpen(false)
                            }}
                        >
                            <span className="mr-2"><RiDeleteBin6Line className="text-red-400" /></span>
                            <span className='text-sm capitalize'>delete</span>
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
};

const titleSchema = yup.object().shape({
    title: yup.string().required('Name is required')
        .min(4, 'title must be at least 4 characters long')
        .max(50, 'title must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
});


const PopupForm = () => {
    const dispatch = useDispatch();
    const { show, actionType, courseId, chapterId, lessonId, label, value } = useSelector(x => x.courseInputState.formState);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { mutateAsync: postChapter } = useCreateChapter(courseId);
    const { mutateAsync: updateChapter } = useRenameChapter(courseId);
    const { mutateAsync: postLesson } = useCreateLesson(chapterId, courseId)

    const actions = {
        addChapter: {
            action: async (title, courseId) => await postChapter({ title, courseId })
                .then(() => console.log("Chapter created successfully"))
                .catch((err) => console.log(err)),
        },
        renameChapter: {
            action: async (title, chapterId) => await updateChapter({ chapterId, title })
                .then(() => console.log("Chapter renamed"))
                .catch((err) => console.log(err)),
        },
        addLesson: {
            action: async (title, chapterId) => await postLesson({ chapterId, title })
                .then(() => console.log("Chapter renamed"))
                .catch((err) => console.log(err)),
        }
    };

    const onSubmit = async () => {
        try {
            await titleSchema.validate({ title: value }).catch(err => {
                setError(error.message);
                return;
            });
            setLoading(true);

            switch (actionType) {
                case ActionTypes.ADD_CHAPTER:
                    await actions.addChapter.action(value, courseId);
                    break;
                case ActionTypes.RENAME_CHAPTER:
                    await actions.renameChapter.action(value, chapterId);
                    break;
                case ActionTypes.ADD_LESSON:
                    await actions.addLesson.action(value, chapterId)
                    break
                default:
                    throw new Error('Unknown action type');

            }
            setError('')

            dispatch(close()); // Close the form on success
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? "" : "hidden"}`}>
            <div onClick={() => dispatch(close())} className="cursor-pointer absolute inset-0 w-screen h-screen bg-black/25"></div>
            <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 scale-100 sm:scale-105 md:scale-100">
                <div className="flex flex-col gap-2 min-w-[400px] rounded-md p-4 dark:text-white dark:bg-gray-600">
                    <div className="border-b border-gray-500 p-2">
                        <h1>{label}</h1>
                    </div>
                    <div className="flex flex-col gap-2 justify-center w-full">
                        <label htmlFor="title" className='text-sm font-bold capitalize dark:text-white'>Title</label>
                        <input
                            autoFocus
                            value={value}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                            type="text"
                            id="title"
                            className='outline-none p-1 ps-2 rounded text-sm dark:text-white dark:bg-gray-600 border border-gray-400'
                        />
                        <p className='text-red-500 text-xs'>{error}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                        <button onClick={onSubmit} type='button' className='flex w-full items-center justify-center p-2 rounded-md bg-blue-500 text-white dark:bg-gray-200 dark:text-black'>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        <button onClick={() => {
                            dispatch(close());
                            dispatch(setTitle('')); // Clear the title on cancel
                        }} type='button' className='flex w-full items-center justify-center p-2 rounded-md text-white dark:bg-red-600 dark:text-white'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};




