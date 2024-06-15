import { addChapter, addLesson, close, deleteChapterConfirmation, openConfirmationDialog, renameChapter, renameLesson, setActiveLesson, setTitle } from '@/features/course/coursSidebarSlice';
import React, { useState } from 'react';

import { FaAngleLeft, FaBook, FaBookOpen, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdList } from 'react-icons/io';
import { MdAdd, MdModeEditOutline } from 'react-icons/md';
import { TiWarningOutline } from "react-icons/ti";
import { RiDeleteBin6Line, RiQuestionAnswerLine } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup"
import { ActionTypes } from '../action.Types';
import { useCreateChapter, useCreateLesson, useRenameChapter, useRenameLesson } from '../hooks/course-hooks';
import { Confirmation } from './confirmationDialog';
import { BsQuestionOctagonFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

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
            <div className={`fixed inset-0 z-10 ${isOpen ? "" : "hidden"}`} onClick={toggleDrawer} />
            <div className={` fixed top-12 h-full left-0 bg-white w-80 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`} >
                <div className="w-full">
                    <div className="h-screen max-h-[1024px] bg-gray-50 border shadow-sm overflow-auto editor">
                        <div className="flex justify-between rounded z-50 gap-2 items-center p-6 bg-blue-400 text-white">
                            <h2 className="text-md flex items-center line-clamp-1 gap-2">
                                <span><FaBook className="text-md" /> </span>
                                <p className='text-left line-clamp-2 text-sm'>{course.title}</p>
                            </h2>
                            <div className="relative group text-black">
                                <MenuWrapper color={"text-white"}>
                                    <li onClick={() => navigate(`/dashboard/course/update/${course._id}`)} className="px-4 py-2 flex items-center cursor-pointer hover:bg-slate-50 rounded-t-md">
                                        <span className="mr-2"><FaAngleLeft/></span>
                                        <span className='text-sm capitalize'>Back to update</span>
                                    </li>
                                    <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-slate-50" onClick={() => dispatch(addChapter({ courseId: course._id, label: "create Chapter", actionType: ActionTypes.ADD_CHAPTER }))}>
                                        <span className="mr-2"><IoMdAddCircleOutline /></span>
                                        <span className='text-sm capitalize'>add chapter </span>
                                    </li>
                                </MenuWrapper>
                            </div>
                        </div>
                        <div className="p-4 mb-10">
                            {course.chapters.map((chapter, index) => (
                                
                                <div key={chapter._id} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-start gap-2 p-2 bg-gray-100   transition duration-300" >
                                        <button className="flex items-start gap-2 w-full p-2 text-black" onClick={() => toggleChapter(index)}>
                                            <span className=''>
                                                {openChapterIndex === index ? <FaBookOpen className="text-md" /> : <FaBook className="text-md" />}
                                            </span>
                                            <span className="text-sm  capitalize line-clamp-1 text-left">{chapter.title + '(' + chapter.lessons.length + ')'}</span>
                                        </button>
                                        <MenuWrapper color={"text-black"}>
                                            <li
                                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    dispatch(renameChapter({ courseId:course._id,chapterId:chapter._id, label: "rename chapter", actionType: ActionTypes.RENAME_CHAPTER, value:chapter.title }))
                                                }}
                                            >
                                                <span className="mr-2"><MdModeEditOutline /></span>
                                                <span className='text-sm capitalize'>rename</span>
                                            </li>

                                            <li
                                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    dispatch(addLesson({ courseId:course._id,chapterId:chapter._id, label: "add lesson", actionType: ActionTypes.ADD_LESSON, value: ""}))
                                                }}
                                            >
                                                <span className="mr-2"><IoMdAddCircleOutline /></span>
                                                <span className='text-sm capitalize'>add lesson </span>
                                            </li>
                                            <li
                                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    navigate(`${chapter._id}/add-test`)
                                                }}
                                            >

                                                <span className="mr-2"><RiQuestionAnswerLine /></span>
                                                <span className='text-sm capitalize'>add quiz</span>
                                            </li>

                                            <li
                                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    dispatch(openConfirmationDialog({ courseId:course._id,chapterId:chapter._id, lessonIds:chapter.lessons.map(lesson => (lesson._id)), message: deleteMessage, actionType: ActionTypes.DELETE_CHAPTER }))
                                                }}
                                            >
                                                <span className="mr-2"><RiDeleteBin6Line className="text-red-400" /></span>
                                                <span className='text-sm capitalize'>delete</span>
                                            </li>
                                        </MenuWrapper>
                                    </div>
                                    <div className={`pl-4 ${openChapterIndex === index ? "" : "hidden"}`}>
                                        <Lessons courseId={course._id} chapterId={chapter._id} lessons={chapter.lessons} />
                                        <div
                                            onClick={() => {
                                                navigate(`${chapter._id}/add-test/${chapter.quiz._id}`)
                                            }}
                                            key={chapter.quiz?._id}
                                            className={`flex items-center justify-between gap-2 p-2 bg-gray-50  rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300 ${!!chapter.quiz?._id ? "" : "hidden"}`}
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
                lessons.length === 0 ? <span className='text-xs pl-5 '>no lessons create one</span> : lessons.map((lesson) => (
                    <div
                        onClick={() => {
                            navigate(`${chapterId}/lessons/${lesson._id}`)
                        }}
                        key={lesson._id}
                        className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
                    >
                        <div className='flex gap-2 text-black'>
                            <span>
                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M4 21V3h14v8.735q-.22-.031-.5-.031t-.5.03V4h-5.5v6.192L9.5 9l-2 1.192V4H5v16h6.992q.073.27.201.528q.128.259.288.472zm13.5.692q-1.671 0-2.835-1.164q-1.165-1.164-1.165-2.836q0-1.67 1.165-2.835q1.164-1.165 2.835-1.165t2.836 1.165t1.164 2.835t-1.164 2.836t-2.836 1.164m-.865-2.115l2.73-1.923l-2.73-1.923zM7.5 4h4zM5 4h12h-5.5h.492z" />
                                </svg>
                            </span>
                            <span className="text-sm line-clamp-1 capitalize">{lesson.title}</span>
                        </div>
                        <MenuWrapper>
                            <li   onClick={() => {
                                                    dispatch(renameLesson({ lessonId: lesson._id, label: "rename lesson", actionType: ActionTypes.RENAME_LESSON,message: "", value:lesson.title }))
                                                }}
                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 ">
                                <span className="mr-2"><MdModeEditOutline /></span>
                                <span className='text-sm capitalize'>rename</span>
                            </li>

                            <li 
                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100">
                                <span className="mr-2"><RiDeleteBin6Line className="text-red-400" /></span>
                                <span className='text-sm capitalize'>delete</span>
                            </li>
                        </MenuWrapper>
                    </div>
                ))
            }
        </div>
    )
}


export const MenuWrapper = ({ children,color }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="relative text-gray-600">
            <button className="w-fit h-fit" onClick={() => setIsMenuOpen(prev => !prev)}>
                <SlOptions size={20} className={color}/>
            </button>
            {isMenuOpen && (
                <div className="fixed h-screen w-screen inset-0 z-40 cursor-default " onClick={() => setIsMenuOpen(false)}></div>
            )}
            {isMenuOpen && (
                <div className="absolute  right-0 w-48 bg-white border-gray-200 border z-40 rounded">
                    <ul className="list-none p-0 m-0" onClick={() => setIsMenuOpen(false)}>
                        {children}
                    </ul>
                </div>
            )}
        </div>
    )
}
const titleSchema = yup.object().shape({
    title: yup.string().required('Name is required')
        .min(4, 'title must be at least 4 characters long')
        .max(50, 'title must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
});


const PopupForm = () => {
  const dispatch = useDispatch();
  const { show, actionType, courseId, chapterId, lessonId, label, value } = useSelector(
    (state) => state.courseInputState.formState
  );

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { mutateAsync: postChapter } = useCreateChapter(courseId);
  const { mutateAsync: updateChapter } = useRenameChapter(courseId);
  const { mutateAsync: postLesson } = useCreateLesson(chapterId, courseId);
  const { mutateAsync: renameLesson } = useRenameLesson(courseId);

  const actions = {
    addChapter: {
      action: async (title, courseId) =>
        await postChapter({ title, courseId })
          .then(() => console.log('Chapter created successfully'))
          .catch((err) => console.log(err)),
    },
    renameChapter: {
      action: async (title, chapterId) =>
        await updateChapter({ chapterId, title })
          .then(() => console.log('Chapter renamed'))
          .catch((err) => console.log(err)),
    },
    addLesson: {
      action: async (title, chapterId) =>
        await postLesson({ chapterId, title })
          .then(() => console.log('Lesson added'))
          .catch((err) => console.log(err)),
    },
  };

  const onSubmit = async () => {
    try {
      await titleSchema.validate({ title: value }).catch((err) => {
        setError(err.message);
        throw new Error(err.message);
      });
      setLoading(true);

      switch (actionType) {
        case ActionTypes.ADD_CHAPTER:
          await postChapter({ title: value, courseId });
          break;
        case ActionTypes.RENAME_CHAPTER:
          await updateChapter({ chapterId, title: value });
          break;
        case ActionTypes.ADD_LESSON:
          await postLesson({ title: value, chapterId });
          break;
        case ActionTypes.RENAME_LESSON:
          await renameLesson({ lessonId, title: value });
          break;
        default:
          throw new Error('Unknown action type');
      }
      setError('');

      dispatch(close()); // Close the form on success
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
      <div onClick={() => dispatch(close())} className="cursor-pointer absolute inset-0 w-screen h-screen bg-black/50"></div>
      <div className="relative bg-white rounded-lg shadow-lg transform transition-all duration-300 scale-100 max-w-md w-full p-4">
        <button
          onClick={() => dispatch(close())}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={20} />
        </button>
        <div className="flex flex-col gap-4">
          <div className="border-b border-gray-300 pb-2 mb-4">
            <h1 className="text-xl font-semibold capitalize">{label}</h1>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-md font-bold">Title</label>
            <input
              autoFocus
              value={value}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              type="text"
              id="title"
              className="outline-none p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
            />
            <p className="text-red-500 text-xs">{error}</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={onSubmit}
              type="button"
              className="flex-1 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              onClick={() => {
                dispatch(close());
                dispatch(setTitle('')); // Clear the title on cancel
              }}
              type="button"
              className="flex-1 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;




