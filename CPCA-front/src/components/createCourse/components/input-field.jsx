import { addChapter, renameChapter,renameLesson,addLesson } from "@/features/course/createCourse";
import { useEffect, useRef, useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { MdAdd, MdModeEditOutline, MdOutlineDownloadDone } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { SlOptions } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "./action.Types";

export const CreateCourseSideBar = () => {
    const inputRef = useRef()
    const course = useSelector(x => x.createCourseState.chapters)
    const [showChapterInput, setShowChapterInput] = useState(false)
 
    return (
        <div className="absolute w-full top-0 left-0 border h-screen flex flex-col gap-1 items-center overflow-scroll p-2">
            {course.map((chapter, idx) => (
                <ChapterList chapter={chapter} key={idx} />
            ))}
            {showChapterInput && <InputField type={ActionTypes.ADD_CHAPTER} toggle={setShowChapterInput} inputRef={inputRef}/>}
            <div className="absolute bottom-0 left-0 z-10 w-full flex items-center justify-center border p-2">
                <button className="flex items-center justify-between gap-2 px-5 py-2 w-fit bg-[#304057] text-white rounded-sm" onClick={() => setShowChapterInput(!showChapterInput)}>
                    <MdAdd size={20} />
                    <span>New Chapter</span>
                </button>
            </div>
        </div>
    )
}

const ChapterList = ({ chapter }) => {
    const { id, lessons } = chapter
    const [index,setIndex] = useState()
    const [edit,setEdit] = useState(false)

    const toggle = () => {
        setEdit(prev => !prev)
    }

    return (
            <div className="w-full flex flex-col gap-2 border p-2">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className={`flex items-center gap-2 ${!(edit && index === id) ? "":"hidden"}`}>
                        <AiOutlineBars size={20} />
                        <span>{chapter.name}</span>
                    </div>
                    {
                      edit && index === id ?  <InputField type={ActionTypes.RENAME_CHAPTER} toggle={toggle} chapter={chapter}/>
                         : 
                       <Menu id={id} toggle={toggle} setIndex={setIndex}/>
                    }
                </div>
                <div className="flex flex-col gap-2 ml-4">
                    {/* {edit && <InputField type={ActionTypes.ADD_LESSON} toggle={toggle} chapter={chapter}/>} */}
                    {lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center justify-between">
                            {!(edit && index === lesson.id) &&<p >{lesson.name}</p>  }
                        
                        {  edit && index === lesson.id ?  <InputField type={ActionTypes.RENAME_LESSON} toggle={toggle} chapter={chapter} lessonId={lesson.id}/>
                                : 
                                <Menu id={lesson.id} toggle={toggle} setIndex={setIndex}/>}
                            </div>                     
                    ))}
                </div>
            </div>
    )
}

const InputField = ({ toggle,type ,chapter,lessonId}) => {
    
    const dispatch  = useDispatch()
    const id = chapter?.id

    const inputRef = useRef()

    const [name, setName ] = useState('')
    useEffect(() => {
        switch (type) {
            case ActionTypes.ADD_CHAPTER:
            case ActionTypes.ADD_LESSON:
                break;
            case ActionTypes.RENAME_CHAPTER:
                setName(chapter?.name);
                break;
            case ActionTypes.RENAME_LESSON:
                const lesson = chapter.lessons.find(lesson => lesson.id === lessonId);
                if (lesson) {
                    setName(lesson.name);
                }
                break;
            default:
                break;
        }
    }, [type]);
  
    const handleClick = () => {
        if(!name) return 
        switch (type) {
            case ActionTypes.ADD_CHAPTER:
                dispatch(addChapter({name}))
                break;
            case ActionTypes.ADD_LESSON:
                dispatch(addLesson({name,id}))
            case ActionTypes.RENAME_CHAPTER:
                dispatch(renameChapter({name,id}))
                break;
            case ActionTypes.RENAME_LESSON:
                dispatch(renameLesson({name,id,lessonId}))
                break;
        }
        toggle()
    }

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            toggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={inputRef} className={`w-fit flex justify-start  gap-2`}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-sm px-2 focus:outline-none focus:border-blue-500"
            />
           
            <button onClick={handleClick}>
                <MdOutlineDownloadDone size={20} />
            </button>
        </div>

    );
};

const Menu = ({ id,toggle,setIndex }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                className=" focus:outline-none"
                onClick={toggleMenu}
            >
                <SlOptions size={20} />
            </button>
            {isOpen && (
                <div className="absolute right-0 flex flex-col mt-3 z-10 w-44 bg-white border border-gray-200 rounded-sm shadow-lg">
                    <button onClick={() => {
                        setIndex(id)
                        toggle()
                    } } className="flex items-center gap-4 p-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                        <MdModeEditOutline size={20} />
                        <span>Rename</span>
                    </button>
                    <button onClick={toggle} className="flex items-center gap-4 p-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                        <MdAdd size={20} />
                        <span>Add Lesson</span>
                    </button>
                    <button className="flex items-center gap-4 p-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                        <RiDeleteBin6Line size={20} className="text-red-400" />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
};

