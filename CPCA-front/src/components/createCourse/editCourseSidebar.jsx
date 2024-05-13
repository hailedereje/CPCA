import { useEffect, useRef, useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { MdAdd, MdModeEditOutline } from "react-icons/md"

import { RiDeleteBin6Line, RiQuestionAnswerLine } from "react-icons/ri"
import { SlOptions } from "react-icons/sl"
import { useDispatch } from "react-redux"
import { ActionTypes } from "./action.Types";
import { addChapter, addLesson, removeChapter, removeLesson, renameChapter, renameLesson, setActiveLesson } from "@/features/course/createCourse";
import { IoMdAddCircleOutline, IoMdList } from "react-icons/io";
import { Input } from "./components/input-field";
import { useLocation, useNavigate } from "react-router-dom";


export const EditCourseSidebar = ({ course, activeLesson }) => {

    const { chapterId, lessonId } = activeLesson
    const { chapters } = course

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const route = pathSegments[pathSegments.length - 1]
    const navigate = useNavigate()

    const initialState = {
        renameLesson: false,
        renameChapter: false,
        addChapter: false,
        addLesson: false,
        addTest: false,
        index: ''
    }
    const [show, setShow] = useState(initialState)
    // const [ route,setRoute ] = useState(pathSegments)

    const dispatch = useDispatch()

    const chapterMenuItems = [
        {
            name: "Rename", icon: <MdModeEditOutline />, action: (id) => {
                console.log(id.chapterId)
                setShow({ ...show, renameChapter: true, index: id.chapterId })
            }
        },
        { name: "Add lesson", icon: <IoMdAddCircleOutline />, action: (idx) => setShow({ ...show, addLesson: true, index: idx.chapterId }) },
        {
            name: "create test", icon: <RiQuestionAnswerLine />, action: (id) => {
                // navigate("/course/edit/2/add-quiz")
                setShow({ ...show, addTest: true, index: id.chapterId })
            }
        },
        { name: "view tests", icon: <IoMdList />, action: () => { } },
        { name: "Delete", icon: <RiDeleteBin6Line className="text-red-400" />, action: (id) => dispatch(removeChapter({ chapterId: id.chapterId })) },
    ]

    const lessonMenuItems = [
        { name: "Rename", icon: <MdModeEditOutline />, action: (id) => setShow({ ...show, renameLesson: true, index: id.lessonId }) },
        { name: "Delete", icon: <RiDeleteBin6Line className="text-red-400" />, action: (id) => dispatch(removeLesson({ ...id })) }
    ]
    return (
        <div className="w-[28%] max-w-[400px] h-full max-h-[1024px]  overflow-scroll mt-16 pb-16 fixed editor  top-0 left-0 flex flex-col gap-2 bg-[#2B3C42] text-white">
            <div className="relative">
                {chapters.map((chapter, idx) => (
                    <div key={chapter.id} className="">
                        <div className="flex flex-col gap-2 border-b border-gray-600 pb-2">
                            <div className={`flex w-full justify-between items-center p-3 gap-3 group ${chapter.id === chapterId ? "bg-[#304057]" : ""} ${!(show.renameChapter && show.index === chapter.id) ? "" : "hidden"}`}>
                                <button className="flex w-3/4 gap-4 p-1">
                                    <span>
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 8h15m-15 8h9m-9 8h15M7 24a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0-8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
                                        </svg>
                                    </span>
                                    <span className="text-md text-gray-200 line-clamp-2 capitalize text-left">{chapter.name}</span>
                                </button>
                                <Menu menuItems={chapterMenuItems} id={{ chapterId: chapter.id, lessonId: '', index: idx }} />
                            </div>

                            <div className={`${show.renameChapter && show.index === chapter.id ? "" : "hidden"}`}>
                                <Input close={() => setShow({ ...show, renameChapter: false, index: '' })}
                                    id={show.index} icon={<AiOutlineBars size={20} />}
                                    title={chapter.name} type={ActionTypes.RENAME_CHAPTER} lessonId={''} />
                            </div>

                            <div className="w-full flex flex-col items-start justify-between p-2">
                                {
                                    chapter.lessons.map(
                                        (lesson, idx) => (
                                            <div key={idx} className={`w-full flex items-start justify-between p-2 rounded-sm ${lesson.id === lessonId && route !== "add-test" ? "bg-[#65B789]" : ""} ${!(show.renameLesson && show.index === lesson.id) ? "" : "hidden"}`}>
                                                <button
                                                    onClick={() => {
                                                        dispatch(setActiveLesson({ chapterId: chapter.id, lessonId: lesson.id }))
                                                        navigate("/course/edit/2")
                                                    }}
                                                    className="flex gap-3 w-3/4">
                                                    <span>
                                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                                        </svg>
                                                    </span>
                                                    <span className="text-sm capitalize text-left">{lesson.name}</span>
                                                </button>
                                                <Menu menuItems={lessonMenuItems} id={{ chapterId: chapter.id, lessonId: lesson.id, index: idx }} />

                                                <div className={`${show.renameLesson && show.index === lesson.id ? "" : "hidden"}`}>
                                                    <Input close={() => setShow({ ...show, renameLesson: false, index: '' })}
                                                        id={chapter.id}
                                                        icon={
                                                            <span>
                                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                    <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                                                </svg>
                                                            </span>
                                                        }
                                                        title={lesson.name} type={ActionTypes.RENAME_LESSON} lessonId={show.index} />
                                                </div>

                                            </div>
                                        ))
                                }

                                <div className={`${show.addLesson && show.index === chapter.id ? "" : "hidden"}`}>
                                    <Input close={() => setShow({ ...show, addLesson: false, index: '' })}
                                        id={show.index} icon={
                                            <span>
                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                                </svg>
                                            </span>}
                                        title={''} type={ActionTypes.ADD_LESSON} lessonId={''} />
                                </div>
                                {/* test */}
                                <div className={`flex w-full justify-between items-center p-1 rounded-sm group ${Object.keys(chapter.test).length === 0 ? "hidden" : ""} ${route === "add-test" ? "bg-green-600" : ""}`}>
                                    <button className="flex w-3/4 gap-3 p-1" onClick={() => navigate(`/course/edit/${chapter.id}/add-test`)}>
                                        <span>
                                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M13.5 14.539q.31 0 .545-.236t.236-.545t-.236-.545t-.545-.236t-.545.236t-.236.545t.236.545t.545.235m-.442-2.815h.884q.039-.629.199-.947q.159-.318.767-.888q.634-.576.884-1.03q.25-.452.25-1.039q0-1.01-.72-1.683q-.72-.674-1.822-.674q-.833 0-1.48.45t-.985 1.227l.811.357q.283-.586.69-.88t.964-.293q.716 0 1.187.424q.47.424.47 1.095q0 .408-.228.759q-.229.351-.787.845q-.632.552-.858 1.013t-.226 1.264M8.116 17q-.691 0-1.153-.462T6.5 15.385V4.615q0-.69.463-1.153T8.116 3h10.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T18.884 17zm0-1h10.769q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T18.884 4H8.116q-.231 0-.424.192t-.192.423v10.77q0 .23.192.423t.423.192m-3 4q-.69 0-1.153-.462T3.5 18.385V6.615h1v11.77q0 .23.192.423t.423.192h11.77v1zM7.5 4v12z" />
                                            </svg>
                                        </span>
                                        <span className="text-md text-gray-200 line-clamp-2 capitalize text-left">{chapter.test?.name}</span>
                                    </button>
                                </div>

                                <div className={`${show.addTest && show.index === chapter.id ? "" : "hidden"}`}>
                                    <Input close={() => setShow({ ...show, addTest: false, index: '' })} id={chapter.id} title={''} type={ActionTypes.ADD_TEST} lessonId={''}
                                        icon={
                                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M13.5 14.539q.31 0 .545-.236t.236-.545t-.236-.545t-.545-.236t-.545.236t-.236.545t.236.545t.545.235m-.442-2.815h.884q.039-.629.199-.947q.159-.318.767-.888q.634-.576.884-1.03q.25-.452.25-1.039q0-1.01-.72-1.683q-.72-.674-1.822-.674q-.833 0-1.48.45t-.985 1.227l.811.357q.283-.586.69-.88t.964-.293q.716 0 1.187.424q.47.424.47 1.095q0 .408-.228.759q-.229.351-.787.845q-.632.552-.858 1.013t-.226 1.264M8.116 17q-.691 0-1.153-.462T6.5 15.385V4.615q0-.69.463-1.153T8.116 3h10.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T18.884 17zm0-1h10.769q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T18.884 4H8.116q-.231 0-.424.192t-.192.423v10.77q0 .23.192.423t.423.192m-3 4q-.69 0-1.153-.462T3.5 18.385V6.615h1v11.77q0 .23.192.423t.423.192h11.77v1zM7.5 4v12z" />
                                            </svg>
                                        } />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                <div className={`${show.addChapter && show.index === '' ? "" : "hidden"}`}>
                    <Input close={() => setShow({ ...show, addChapter: false, index: '' })}
                        id={show.index} icon={<AiOutlineBars size={20} />}
                        title={''} type={ActionTypes.ADD_CHAPTER} lessonId={''} />
                </div>

            </div>

            <div className="fixed bottom-2 left-20 z-10">
                <button onClick={() => setShow({ ...show, addChapter: true })} className="flex items-center justify-between gap-2 px-5 py-2 w-fit bg-[#32bc6e] text-white rounded-sm">
                    <MdAdd size={20} />
                    <span>New Chapter</span>
                </button>
            </div>
        </div>
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

            <div className={`absolute z-20 right-0 mt-3  w-36 bg-white rounded-sm shadow-lg ${isOpen ? "" : "hidden"}`}>
                {menuItems.map((item, idx) => (
                    <button key={idx} onClick={() => {
                        item.action(id)
                        toggleMenu()
                    }} className="flex items-center gap-2 p-2 capitalize text-gray-800 hover:bg-gray-200  w-full text-left">
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}