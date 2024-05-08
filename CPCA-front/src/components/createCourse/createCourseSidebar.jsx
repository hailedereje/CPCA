import { useEffect, useRef, useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { MdAdd, MdModeEditOutline, MdOutlineDownloadDone } from "react-icons/md"
import { CiCircleChevDown, CiViewList } from "react-icons/ci";

import { RiDeleteBin6Line, RiQuestionAnswerLine } from "react-icons/ri"
import { SlOptions } from "react-icons/sl"
import { useDispatch, useSelector } from "react-redux"
import { ActionTypes } from "./action.Types";
import { addChapter, addLesson, removeChapter, renameChapter, renameLesson, setActiveLesson } from "@/features/course/createCourse";
import { IoMdAddCircleOutline, IoMdList } from "react-icons/io";


export const CreateCourseSideBar = ({ course, activeLesson }) => {

    const { chapterId, lessonId } = activeLesson
    const { chapters } = course

    const [show, setShow] = useState({
        renameLesson: false,
        renameChapter: false,
        addChapter: false,
        addLesson: false,
        index: ''
    })

    const dispatch = useDispatch()

    const chapterMenuItems = [
        {
            name: "Rename", icon: <MdModeEditOutline />, action: (id) => {
                console.log(id.chapterId)
                setShow({ ...show, renameChapter: true, index: id.chapterId })
            }
        },
        { name: "Add lesson", icon: <IoMdAddCircleOutline />, action: (idx) => setShow({ ...show, addLesson: true, index: idx.chapterId }) },
        { name: "create test", icon: <RiQuestionAnswerLine />, action: () => { } },
        { name: "view tests", icon: <IoMdList />, action: () => { } },
        { name: "Delete chapter", icon: <RiDeleteBin6Line className="text-red-400" />, action: (id) => dispatch(removeChapter({ chapterId: id.chapterId })) },
    ]

    const lessonMenuItems = [
        { name: "Rename", icon: <MdModeEditOutline />, action: (id) => setShow({ ...show, renameLesson: true, index: id.lessonId }) },
        { name: "Delete", icon: <RiDeleteBin6Line className="text-red-400" />, action: () => { } }
    ]
    
    return (
        <div className="w-[28%] max-w-[400px] h-screen  overflow-scroll max-h-[1024px] py-16 fixed  top-0 left-0 flex flex-col gap-2 bg-[#2B3C42] text-white">
            {chapters.map(chapter => (
                <div key={chapter.id} className="">
                    <div className="flex flex-col gap-2 border-b border-gray-600 pb-2">
                        {!(show.renameChapter && show.index === chapter.id) &&
                            <div className={`flex w-full justify-between items-center gap-3 p-3 group ${chapter.id === chapterId ? "bg-[#304057]" : ""}`}>
                                <button className="flex w-3/4 gap-4 p-2">
                                    <span>
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 8h15m-15 8h9m-9 8h15M7 24a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
                                        </svg>
                                    </span>
                                    <span className="text-md text-gray-200 line-clamp-2 capitalize text-left">{chapter.name}</span>
                                </button>
                                <div className="group-hover:visible invisible">
                                    <Menu menuItems={chapterMenuItems} id={{ chapterId: chapter.id, lessonId: '' }} />
                                </div>

                            </div>
                        }
                        {
                            show.renameChapter && show.index === chapter.id && <Input close={() => setShow({ ...show, renameChapter: false, index: '' })}
                                id={show.index} icon={<AiOutlineBars size={20} />}
                                title={chapter.name} type={ActionTypes.RENAME_CHAPTER} lessonId={''} />
                        }
                        {<div className="w-full flex flex-col items-start justify-between p-2">
                            {
                                chapter.lessons.map(
                                    lesson => (
                                        <div key={lesson.id} className={`w-full flex items-end justify-between p-2 rounded-sm ${lesson.id === lessonId ? "bg-[#65B789]" : ""}`}>
                                            {!(show.renameLesson && show.index === lesson.id) && <>
                                                <button onClick={() => dispatch(setActiveLesson({ chapterId: chapter.id, lessonId: lesson.id }))} className="flex gap-3">
                                                    <span>
                                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-sm capitalize text-left">{lesson.name}</span>
                                                </button>
                                                <Menu menuItems={lessonMenuItems} id={{ chapterId: chapter.id, lessonId: lesson.id }} />
                                            </>}
                                            {
                                                show.renameLesson && show.index === lesson.id && <Input close={() => setShow({ ...show, renameLesson: false, index: '' })}
                                                    id={chapter.id} icon={<CiCircleChevDown />}
                                                    title={lesson.name} type={ActionTypes.RENAME_LESSON} lessonId={show.index} />
                                            }
                                        </div>
                                    ))
                            }
                            {
                                show.addLesson && show.index === chapter.id && <Input close={() => setShow({ ...show, addLesson: false, index: '' })}
                                    id={show.index} icon={
                                        <span>
                                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                            </svg>
                                        </span>}
                                    title={''} type={ActionTypes.ADD_LESSON} lessonId={''} />
                            }
                        </div>
                        }
                    </div>
                </div>
            ))}
            {
                show.addChapter && show.index === '' && <Input close={() => setShow({ ...show, addChapter: false, index: '' })}
                    id={show.index} icon={<AiOutlineBars size={20} />}
                    title={''} type={ActionTypes.ADD_CHAPTER} lessonId={''} />
            }
            <div className="fixed bottom-2 left-20 z-10">
                <button onClick={() => setShow({ ...show, addChapter: !show.addChapter })} className="flex items-center justify-between gap-2 px-5 py-2 w-fit bg-[#32bc6e] text-white rounded-sm">
                    <MdAdd size={20} />
                    <span>New Chapter</span>
                </button>
            </div>
        </div>
    )
}


const Input = ({ close, id, lessonId, type, title, icon }) => {

    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const outsideRef = useRef(null)

    const [name, setName] = useState(title ?? '')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return

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
    }

    const handleClickOutside = (event) => {
        if (outsideRef.current && !outsideRef.current.contains(event.target)) close()
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        inputRef.current.focus()
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [close]);

    return (
        <form onSubmit={handleSubmit} ref={outsideRef} className={`w-fit flex justify-start gap-2 p-2`}>
            <div className="flex items-center gap-3">
                {icon}
                <input
                    ref={inputRef}
                    type="text" id="simple-search"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-blue-500 block w-full pe-10 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            </div>

            <button type="submit" hidden>
                <MdOutlineDownloadDone size={20} />
            </button>
        </form>
    )
}
const Menu = ({ menuItems, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleClickOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false) }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={toggleMenu} className=" focus:outline-none peer" >
                <SlOptions size={20} />
            </button>

            <div className={`absolute right-0 mt-3 z-10 w-36 bg-white rounded-sm shadow-lg ${isOpen ? "" : "hidden"}`}>
                {menuItems.map((item, idx) => (
                    <button key={idx} onClick={() => {
                        item.action(id)
                        toggleMenu()
                    }} className="flex items-center gap-2 p-2 capitalize text-gray-800 hover:bg-gray-200  w-full text-left">
                        {item.icon}
                        <span className="text-xs font-medium">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}