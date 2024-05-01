import { useEffect, useRef, useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { MdAdd, MdModeEditOutline, MdOutlineDownloadDone } from "react-icons/md"
import { CiCircleChevDown } from "react-icons/ci";

import { RiDeleteBin6Line } from "react-icons/ri"
import { SlOptions } from "react-icons/sl"
import { useDispatch, useSelector } from "react-redux"
import { ActionTypes } from "./action.Types";
import { addChapter, addLesson, renameChapter, renameLesson } from "@/features/course/createCourse";
import { IoMdAddCircleOutline } from "react-icons/io";


export const CreateCourseSideBar = () => {

    const course = useSelector(x => x.createCourseState.chapters)
    const [show, setShow] = useState({ renameLesson: false, renameChapter: false, addChapter: false, addLesson: false, index: '' })

    const chapterMenuItems = [
        { name: "rename", icon: <MdModeEditOutline/>, action: (idx) => setShow({ ...show, renameChapter: true, index: idx }) },
        { name: "add lesson", icon: <IoMdAddCircleOutline />, action: (idx) => setShow({ ...show, addLesson: true, index: idx }) },
        { name: "delete", icon: <RiDeleteBin6Line className="text-red-400" />, action: () => { } }
    ]

    const lessonMenuItems = [
        { name: "rename", icon: <MdModeEditOutline  />, action: (idx) => setShow({ ...show, renameLesson: true,index:idx }) },
        { name: "delete", icon: <RiDeleteBin6Line  className="text-red-400" />, action: () => { } }
    ]
    console.log(show.index)
    return (
        <div className="w-full h-screen absolute top-0 left-0 border flex flex-col gap-2">
            {course.map(chapter => (
                <div key={chapter.id} className="">
                    <div className="flex flex-col gap-3 border">
                        {!(show.renameChapter && show.index === chapter.id) &&
                            <div className={`flex justify-between items-center border p-3 group`}>
                                <button className="focus:bg-blue-200 flex items-center gap-3 w-3/4">
                                    <AiOutlineBars size={20} />
                                    <span>{chapter.name}</span>
                                </button>
                                <Menu menuItems={chapterMenuItems} id={chapter.id} />
                            </div>
                        }
                        {
                            show.renameChapter && show.index === chapter.id && <Input close={() => setShow({ ...show, renameChapter: false, index: '' })}
                                id={show.index} icon={<AiOutlineBars size={20} />}
                                title={chapter.name} type={ActionTypes.RENAME_CHAPTER} lessonId={''} />
                        }
                        {   <div className="w-full flex flex-col gap-2 items-center justify-between px-4">
                            {
                                show.addLesson && show.index === chapter.id && <Input close={() => setShow({ ...show, addLesson: false, index: '' })}
                                                                                    id={show.index} icon={<CiCircleChevDown />}
                                                                                    title={''} type={ActionTypes.ADD_LESSON} lessonId={''} />
                            }
                           { 
                          
                           chapter.lessons.map(lesson => (
                                <div key={lesson.id} className="w-full flex items-center justify-between group">
                                   {!(show.renameLesson && show.index === lesson.id )&& <>
                                    
                                    <div className="flex items-center gap-3">
                                        <CiCircleChevDown />
                                        <span>{lesson.name}</span>
                                    </div>
                                    <Menu menuItems={lessonMenuItems} id={lesson.id} />
                                    </>}
                                    {
                                        show.renameLesson && show.index === lesson.id && <Input close={() => setShow({ ...show, renameLesson: false, index: '' })}
                                                                                            id={chapter.id} icon={<CiCircleChevDown />}
                                                                                            title={lesson.name} type={ActionTypes.RENAME_LESSON} lessonId={show.index} />
                                    }
                                </div>
                            ))
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
            <div className="absolute bottom-0 left-0 z-10 w-full flex items-center justify-center border p-2">
                <button onClick={() => setShow({ ...show, addChapter: !show.addChapter })} className="flex items-center justify-between gap-2 px-5 py-2 w-fit bg-[#304057] text-white rounded-sm">
                    <MdAdd size={20} />
                    <span>New Chapter</span>
                </button>
            </div>
        </div>
    )
}

const Lesson = ({lessons,lessonMenuItems,show,children}) => {
    return (
        <>
        {
            lessons.map(lesson => (
                <div key={lesson.id} className="w-full flex items-center justify-between group">
                   {!(show.renameLesson && show.index === lesson.id )&& <>
                    
                    <div className="flex items-center gap-3">
                        <CiCircleChevDown />
                        <span>{lesson.name}</span>
                    </div>
                    <Menu menuItems={lessonMenuItems} id={lesson.id} />
                    </>}
                    { children }
                </div>
            ))
        }
    </>
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
                console.log("lesson add")
                dispatch(addLesson({ name, id }))
                break;
            case ActionTypes.RENAME_CHAPTER:
                console.log("dispatched")
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
                    class="border border-gray-300 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-blue-500 block w-full pe-10 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

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

            <div className={`absolute right-0 mt-3 z-10 w-36 bg-white border border-gray-200 rounded-sm shadow-lg ${isOpen ? "" : "hidden"}`}>
                {menuItems.map((item, idx) => (
                    <button key={idx} onClick={() => {
                        item.action(id)
                        toggleMenu()
                        }} className="flex items-center gap-4 p-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                        {item.icon}
                        <span>{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}