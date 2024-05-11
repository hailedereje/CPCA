import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';

import { useDispatch } from "react-redux";
import { toggleShow, updateTopic } from "../../features/course/createCourse";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import {  LANGUAGES, LANGUAGE_List } from '../../assets/constants';
import { IoLogoJavascript } from 'react-icons/io';
import { SlOptions } from 'react-icons/sl';

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
            <button onClick={toggleMenu} className="focus:outline-none flex items-center bg-gray-100 py-2 px-4 rounded" >
                <span className='text-sm capitalize'>{code.language}</span>
            </button>

            <div className={`absolute left-0 mt-3 z-10 w-36 h-44 overflow-scroll bg-white editor  rounded-sm shadow-lg ${isOpen ? "" : "hidden"}`}>
                {languages.map((item, idx) => (
                    <button key={idx} onClick={() => {
                        setcode(prev => ({...prev,language:item.name}))
                        toggleMenu()
                    }} className={`flex items-center gap-2 p-2 capitalize  hover:bg-gray-200 text-white w-full text-left ${code.language === item.name ? "bg-[#32bc6e]": ""}`}>
                        {item.icon}
                        <span className="text-xs font-medium text-black">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
export const CodeContentEditor = ({ topicItem,chapterId,lessonId }) => {
    
    const { show, id, content, name } = topicItem;
    const dispatch = useDispatch();
    const [code, setCode] = useState(content);

    const editorRef = useRef()
    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }
    return (
        <div className={`fixed z-20 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${show ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div onClick={() => dispatch(toggleShow({ chapterId,lessonId,topicId:topicItem.id }))} className="absolute top-0 left-0 w-full h-full bg-black/60" />
           
            <div className="flex flex-col items-start justify-between z-10 gap-4 w-fit duration-300 bg-white p-3 rounded-md">
                <div className="dropdown">
                    <CodeMenu setcode={setCode} code={code}/>
                </div>

                <Editor
                    theme='vs-dark'
                    line={10}
                    height={"60vh"}
                    width={"60vw"}
                    defaultLanguage='javascript'
                    language={code.language}
                    value={code.code}
                    onMount={onMount}
                    onChange={(value) => setCode({ ...code, code: value })}
                    loading={<div>loading ...</div>}
                />
                <div className="flex gap-5">
                    <button onClick={() => {
                        dispatch(updateTopic({ chapterId,lessonId,topicId:topicItem.id, content:code }))
                        dispatch(toggleShow({ chapterId,lessonId,topicId:topicItem.id }))
                    }} 
                    type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        add
                    </button>
                    <button onClick={() => dispatch(toggleShow({ chapterId,lessonId,topicId:topicItem.id }))}>cancel</button>
                </div>

            </div>
        </div>
    )
}