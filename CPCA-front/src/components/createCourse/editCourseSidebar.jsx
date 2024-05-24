import { useEffect, useRef, useState } from "react"
import { MdAdd, MdModeEditOutline } from "react-icons/md"

import { RiDeleteBin6Line, RiQuestionAnswerLine } from "react-icons/ri"
import { SlOptions } from "react-icons/sl"
import { useDispatch } from "react-redux"
import { ActionTypes } from "./action.Types";
import {  removeChapter, removeLesson, renameChapter, renameLesson, setActiveLesson } from "@/features/course/createCourse";
import { IoMdAddCircleOutline, IoMdList } from "react-icons/io";
import { Input } from "./components/input-field";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import newRequests from "@/utils/newRequest"


export const EditCourseSidebar = ({course, activeLesson,courseId }) => {
    const client = useQueryClient()
    // const data = client.getQueryData(['course',courseId]).data.course
    // const {_id: id,chapters} = data

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
        <div className="w-64 max-w-[400px] h-full max-h-[1024px]  overflow-scroll mt-16 pb-16 fixed editor  top-0 left-0 flex flex-col gap-2 bg-gray-50 text-black">
            <div className="relative">
                {chapters.map((chapter, idx) => (
                    <div key={chapter.id} className="">
                        <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
                            <div className={`flex w-full justify-between items-center p-3 gap-3 group ${chapter.id === chapterId ? "bg-slate-100" : ""} ${!(show.renameChapter && show.index === chapter.id) ? "" : "hidden"}`}>
                                <button className="flex w-3/4 gap-4 p-1">
                                    <span>
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19 20H5V4h2v3h10V4h2m-7-2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m7 0h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" />
                                        </svg>
                                    </span>
                                    <span className="text-md text-gray-700 font-medium line-clamp-2 capitalize text-left">{chapter.name}</span>
                                </button>
                                <Menu menuItems={chapterMenuItems} id={{ chapterId: chapter.id, lessonId: '', index: idx }} />
                            </div>

                            <div className={`${show.renameChapter && show.index === chapter.id ? "" : "hidden"}`}>
                                <Input close={() => setShow({ ...show, renameChapter: false, index: '' })}
                                    id={show.index} icon={<span>
                                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19 20H5V4h2v3h10V4h2m-7-2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m7 0h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" />
                                        </svg>
                                    </span>}
                                    title={chapter.name} type={ActionTypes.RENAME_CHAPTER} lessonId={''} />
                            </div>

                            <div className="w-full flex flex-col items-start justify-between p-2">
                                {
                                    chapter.lessons.map(
                                        (lesson, idx) => (
                                            <div key={idx} className={`w-full  rounded-sm ${lesson.id === lessonId && route !== "add-test" ? "bg-slate-200" : ""}`}>
                                                <div className={`flex items-start justify-between p-2 ${!(show.renameLesson && show.index === lesson.id) ? "" : "hidden"}`}>
                                                    <button
                                                        onClick={() => {
                                                            dispatch(setActiveLesson({ chapterId: chapter.id, lessonId: lesson.id }))
                                                            navigate("/course/edit/2")
                                                        }}
                                                        className="flex gap-3 w-3/4">
                                                        <span>
                                                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M4 21V3h14v8.735q-.22-.031-.5-.031t-.5.03V4h-5.5v6.192L9.5 9l-2 1.192V4H5v16h6.992q.073.27.201.528q.128.259.288.472zm13.5.692q-1.671 0-2.835-1.164q-1.165-1.164-1.165-2.836q0-1.67 1.165-2.835q1.164-1.165 2.835-1.165t2.836 1.165t1.164 2.835t-1.164 2.836t-2.836 1.164m-.865-2.115l2.73-1.923l-2.73-1.923zM7.5 4h4zM5 4h12h-5.5h.492z" />
                                                            </svg>
                                                        </span>
                                                        <span className="text-sm capitalize text-left">{lesson.name}</span>
                                                    </button>
                                                    <Menu menuItems={lessonMenuItems} id={{ chapterId: chapter.id, lessonId: lesson.id, index: idx }} />
                                                </div>
                                                <div className={`${show.renameLesson && show.index === lesson.id ? "" : "hidden"}`}>
                                                    <Input close={() => setShow({ ...show, renameLesson: false, index: '' })}
                                                        id={chapter.id}
                                                        icon={
                                                            <span>
                                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M4 21V3h14v8.735q-.22-.031-.5-.031t-.5.03V4h-5.5v6.192L9.5 9l-2 1.192V4H5v16h6.992q.073.27.201.528q.128.259.288.472zm13.5.692q-1.671 0-2.835-1.164q-1.165-1.164-1.165-2.836q0-1.67 1.165-2.835q1.164-1.165 2.835-1.165t2.836 1.165t1.164 2.835t-1.164 2.836t-2.836 1.164m-.865-2.115l2.73-1.923l-2.73-1.923zM7.5 4h4zM5 4h12h-5.5h.492z" />
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
                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M4 21V3h14v8.735q-.22-.031-.5-.031t-.5.03V4h-5.5v6.192L9.5 9l-2 1.192V4H5v16h6.992q.073.27.201.528q.128.259.288.472zm13.5.692q-1.671 0-2.835-1.164q-1.165-1.164-1.165-2.836q0-1.67 1.165-2.835q1.164-1.165 2.835-1.165t2.836 1.165t1.164 2.835t-1.164 2.836t-2.836 1.164m-.865-2.115l2.73-1.923l-2.73-1.923zM7.5 4h4zM5 4h12h-5.5h.492z" />
                                                </svg>
                                            </span>}
                                        title={''} type={ActionTypes.ADD_LESSON} lessonId={''} />
                                </div>
                                {/* test */}
                                <div className={`flex w-full justify-between items-center p-1 rounded-sm group ${Object.keys(chapter.quiz).length === 0 ? "hidden" : ""} ${route === "add-test" ? "bg-gray-200" : ""}`}>
                                    <button className="flex w-3/4 gap-3 p-1" onClick={() => navigate(`/course/edit/${chapter.id}/add-test`)}>
                                        <span>
                                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                <g fill="currentColor">
                                                    <path d="M20 15a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm-1 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" />
                                                    <path fill-rule="evenodd" d="M10 27a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm2 1v3h3v-3z" clip-rule="evenodd" />
                                                    <path d="M17.707 15.707a1 1 0 0 0-1.414-1.414L13 17.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L13 20.414z" />
                                                    <path fill-rule="evenodd" d="M10 6a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zm-2 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2zm28 6a3 3 0 1 1 6 0v20.303l-3 4.5l-3-4.5zm3-1a1 1 0 0 0-1 1v2h2v-2a1 1 0 0 0-1-1m0 22.197l-1-1.5V20h2v15.697z" clip-rule="evenodd" />
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="text-md line-clamp-2 capitalize text-left">{chapter.quiz?.name}</span>
                                    </button>
                                </div>

                                <div className={`${show.addTest && show.index === chapter.id ? "" : "hidden"}`}>
                                    <Input close={() => setShow({ ...show, addTest: false, index: '' })} id={chapter.id} title={''} type={ActionTypes.ADD_TEST} lessonId={''}
                                        icon={
                                            <span>
                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                    <g fill="currentColor">
                                                        <path d="M20 15a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm-1 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" />
                                                        <path fill-rule="evenodd" d="M10 27a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm2 1v3h3v-3z" clip-rule="evenodd" />
                                                        <path d="M17.707 15.707a1 1 0 0 0-1.414-1.414L13 17.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L13 20.414z" />
                                                        <path fill-rule="evenodd" d="M10 6a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zm-2 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2zm28 6a3 3 0 1 1 6 0v20.303l-3 4.5l-3-4.5zm3-1a1 1 0 0 0-1 1v2h2v-2a1 1 0 0 0-1-1m0 22.197l-1-1.5V20h2v15.697z" clip-rule="evenodd" />
                                                    </g>
                                                </svg>
                                            </span>
                                        } />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                <div className={`${show.addChapter && show.index === '' ? "" : "hidden"}`}>
                    <Input close={() => setShow({ ...show, addChapter: false, index: '' })}
                        id={show.index} icon={<span>
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19 20H5V4h2v3h10V4h2m-7-2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m7 0h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" />
                            </svg>
                        </span>}
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



// const Menu = ({ menuItems, id }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const menuRef = useRef(null);

//     const toggleMenu = () => setIsOpen(!isOpen);
//     const handleClickOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false) }

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

    
//     return (
//         <div className="dropdown" ref={menuRef}>
//             <button onClick={toggleMenu} className="btn focus:outline-none peer" >
//                 <SlOptions size={20} />
//             </button>

//             <div className={`dropdown-content menu w-52 z-`}>
//                 {menuItems.map((item, idx) => (
//                     <button key={idx} onClick={() => {
//                         item.action(id)
//                         // toggleMenu()
//                     }} className="flex items-center gap-2 p-2 capitalize text-gray-800 hover:bg-gray-200  w-full text-left">
//                         {item.icon}
//                         <span className="text-sm font-medium">{item.name}</span>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     )
// }

const Menu = ({menuItems,id}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
      <div className="relative inline-block">
        <button className="" onClick={() => setIsMenuOpen(prev => !prev)}>
            <SlOptions size={20} />     
        </button>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
        )}
        {isMenuOpen && (
          <div className="absolute top-10 left-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 dark:bg-gray-600 dark:text-white dark:border-black">
            <ul className="list-none p-0 m-0">
            {menuItems.map(item => (
                <li
                  key={item.name}
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                  onClick={() => {
                    item.action(id)
                  }} 
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  