import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';

import { useDispatch } from "react-redux";
import { toggleShow, updateTopic } from "../../features/course/createCourse";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import {  LANGUAGE_List } from '../../assets/constants';

export const CodeContentEditor = ({ topicItem,chapterId,lessonId }) => {
    const { show, id, content, name } = topicItem;
    // console.log(content)
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
                    <div tabIndex={0} role="button" className="btn m-1 px-4 ">{code.language}</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 h-52 overflow-scroll">
                        { LANGUAGE_List.map((lang,idx) => (
                            <li key={idx} onClick={() => setCode({...code,language:lang})}>
                                <button>
                                {lang}
                                </button>
                            </li>
                        ))  } 
                    </ul>
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