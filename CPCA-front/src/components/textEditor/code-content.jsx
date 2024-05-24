import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';

import { useDispatch, useSelector } from "react-redux";
import { toggleShow, updateTopic } from "../../features/course/createCourse";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import {  LANGUAGES, LANGUAGE_List } from '../../assets/constants';
import { IoLogoJavascript } from 'react-icons/io';
import { SlOptions } from 'react-icons/sl';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { closeEditor } from '@/features/course/coursSidebarSlice';
import { useAddLessonItem, useUpdateLessonItem } from '../createCourse/hooks/course-hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ActionTypes } from '../createCourse/action.Types';

const CodeMenu = ({ setcode,code }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const languages = LANGUAGE_List
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
            <button onClick={toggleMenu}  className="bg-gray-800 text-white py-2 px-4 rounded  flex gap-3 items-center" >
                <span className='text-xs capitalize'>{code.language}</span>
                <span className='w-5'><RiArrowDropDownLine/></span>
                
            </button>

            <div className={`absolute left-0 mt-2 z-10 w-36 h-44 overflow-scroll bg-white editor  rounded-sm shadow-lg ${isOpen ? "" : "hidden"}`}>
                {languages.map((item, idx) => (
                    <button key={idx} onClick={() => {
                        setcode(prev => ({...prev,language:item.name}))
                        toggleMenu()
                    }} className={`group flex items-center gap-2 p-2 capitalize text-black  hover:bg-gray-200 w-full text-left ${code.language === item.name ? "bg-[#32bc6e] text-white hover:bg-[#32bc6e]": ""}`}>
                        <span className=''>{item.icon}</span>
                        <span className="text-xs w-full">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}


export const CodeContentEditor = ({lessonId,value}) => {
    const dispatch = useDispatch();
    const editorRef = useRef()
    const  {showCodeEditor}  = useSelector(x => x.courseInputState)
    console.log(value)
    const [code, setCode] = useState(value);
    const [loading,setLoading] = useState(false)
    console.log(code)
    const { mutateAsync: postLessonItem,isPending } = useAddLessonItem(lessonId)
    const { mutateAsync: updateLessonItem, } = useUpdateLessonItem(lessonId)
    
    const actions = {
        addLessonItem: async(data) => await postLessonItem(data),
        editLessonItem: async(data) => await updateLessonItem(lessonId,data)
    }
    const onSubmit = async() => {
        try {
            setLoading(true)
            switch (actionType) {
                case '':
                    await actions.addLessonItem({lessonId,type:'code',value: {...code}})
                    break
                case ActionTypes.UPDATE_LESSON_ITEM:
                    await actions.editLessonItem({lessonId,lessonItemId,value: {...code}})
                    break
            }
            setLoading(false)
            dispatch(closeEditor())
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
          
    }
    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }
    return (
        <div className={`fixed z-20 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${showCodeEditor ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
            <div className="flex flex-col items-start justify-between z-10 w-fit duration-300 rounded-md bg-[#1e1e1e] relative">
                <div className="">
                    <CodeMenu setcode={setCode} code={code}/>
                </div>

                <Editor
                    theme='vs-dark'
                    line={10}
                    height={"60vh"}
                    width={"60vw"}
                    defaultLanguage='javascript'
                    language={code.language}
                    value={code.content}
                    onMount={onMount}
                    onChange={(value) => setCode({ ...code, content: value })}
                    loading={<div>loading ...</div>}
                />
                <div className="absolute top-0 right-5 flex gap-5 p-1">
                    <button onClick={onSubmit} 
                    type="button" className="border border-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-4 rounded " >
                        { loading ? <AiOutlineLoading3Quarters className='animate-spin'/>:"add"}
                    </button>
                    <button onClick={() => dispatch(closeEditor())}  className="border border-transparent hover:border-red-400 text-red-500 text-sm py-1 px-3 rounded mr-2">cancel</button>
                </div>

            </div>
        </div>
    )
}