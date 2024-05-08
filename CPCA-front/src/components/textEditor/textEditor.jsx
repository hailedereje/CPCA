import {  useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { addTopic, removeTopic, toggleShow } from "../../features/course/createCourse";
import { nanoid } from "@reduxjs/toolkit";
import { TextEditor } from "./fraolaEditor";
import { CodeContentEditor } from "./code-content";
import { SyntaxHighlighter } from "./syntax-highlighter";
import { UploadImage } from "./uploadImage";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";



function RichTextExample({lesson,chapterId,lessonId}) {
 
  const [ index , setIndex] = useState()
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
 
  return (
    <div className="flex flex-col items-center w-full py-10 max-w-[1024px] ">
      {(lesson && chapterId && lesson.topics.length ===0) && 
        <div className="group flex justify-between items-end  gap-4">
          <EditLinks idx={0} setImage={setImage} setIndex={setIndex} chapterId={chapterId} lessonId={lessonId}/>
          <span className="text-xl font-medium capitalize">start adding contents to your lesson</span>
        </div>}
      {lesson.topics && lesson.topics.map((topicItem,idx) => (
        <div className="group w-full h-full flex gap-3" key={idx}>
          <div className="invisible group-hover:visible">
            <EditLinks idx={idx} setImage={setImage} setIndex={setIndex} chapterId={chapterId} lessonId={lessonId}/>
          </div>
          
          {topicItem.name === "text" &&
            <>
              <div className="w-4/5 group  flex flex-col-reverse gap-y-4  rounded-lg  p-3 relative">
                <div className="absolute bottom-0 right-0 flex items-center justify-end gap-5 p-3 invisible group-hover:visible">
                  <button onClick={() => dispatch(toggleShow({ chapterId,lessonId, topicId: topicItem.id }))} className="">
                    <svg className="w-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m3.1 5.07c.14 0 .28.05.4.16l1.27 1.27c.23.22.23.57 0 .78l-1 1l-2.05-2.05l1-1c.1-.11.24-.16.38-.16m-1.97 1.74l2.06 2.06l-6.06 6.06H7.07v-2.06z" />
                    </svg>
                  </button>
                  <button onClick={() => dispatch(removeTopic(({ chapterId,lessonId,topicId: topicItem.id })))} className="">
                    <svg className="w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                    </svg>
                  </button>
                </div>
                <div className="flex rounded-md border border-gray-100 p-4 w-full h-full max-h-[300px] overflow-auto">
                <FroalaEditorView
                    model={topicItem.content}
                />
                  {/* {parser(topicItem.content)} */}
                </div>
              </div>
              <TextEditor topicItem={topicItem} chapterId={chapterId} lessonId={lessonId}/>
            </>
          }
          {
            topicItem.name === 'image' &&
            <>
              <div className="w-full group flex flex-col-reverse items-center rounded-lg relative">
                <div className="absolute bottom-0 right-0 flex items-center justify-end gap-5 p-3 invisible group-hover:visible">
                  <button  onClick={() => dispatch(toggleShow({ chapterId,LessonId, topicId: topicItem.id }))} className="">
                    <svg className="w-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m3.1 5.07c.14 0 .28.05.4.16l1.27 1.27c.23.22.23.57 0 .78l-1 1l-2.05-2.05l1-1c.1-.11.24-.16.38-.16m-1.97 1.74l2.06 2.06l-6.06 6.06H7.07v-2.06z" />
                    </svg>
                  </button>
                  <button onClick={() => dispatch(removeTopic(topicItem.id))} className="">
                    <svg className="w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                    </svg>
                  </button>
                </div>
                <div className="p-3 w-1/2">
                  <img src={topicItem.content} className="w-fit" alt="" />
                </div>
              </div>

            </>
          }
          <UploadImage idx={index} image={image} setImage={setImage} />
          {topicItem.name === 'code' &&
            <>
              <CodeContentEditor topicItem={topicItem} chapterId={chapterId} lessonId={lessonId}/>
              <div className="w-4/5 group  flex flex-col-reverse gap-y-4 rounded-lg relative">
                <div className="absolute bottom-0 right-0 z-10 flex items-center justify-end gap-5 p-3 invisible group-hover:visible">
                  <button onClick={() => dispatch(toggleShow(({ chapterId,lessonId,topicId: topicItem.id })))} className="">
                    <svg className="w-6 text-[#32bc6e]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m3.1 5.07c.14 0 .28.05.4.16l1.27 1.27c.23.22.23.57 0 .78l-1 1l-2.05-2.05l1-1c.1-.11.24-.16.38-.16m-1.97 1.74l2.06 2.06l-6.06 6.06H7.07v-2.06z" />
                    </svg>
                  </button>
                  <button onClick={() => dispatch(removeTopic(({ chapterId,lessonId,topicId: topicItem.id })))}>
                    <svg className="w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-center p-3 h-full max-w-[screen]">
                  <SyntaxHighlighter code={topicItem.content} />
                </div>
              </div>

            </>
          }

        </div>
      ))}
    </div>
  );
}

export default RichTextExample;

const EditLinks = ({ idx,setImage ,setIndex,chapterId,lessonId}) => {
  const dispatch = useDispatch()

  const [buttonsVisible, setButtonsVisible] = useState(false);

  const toggleButtonsVisibility = () => {
    setButtonsVisible(!buttonsVisible);
  };

  const initialTopic = { id: nanoid(),name:'text', content: "edit the content", show: false }

  return (
    <div className="w-fit flex flex-col-reverse items-end gap-5 relative">
      <button className="peer transform transition-transform duration-300 focus:rotate-45 " onClick={toggleButtonsVisibility}>
        <svg className={`w-8 text-green-600 `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path fill="currentColor" d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6" />
          <path fill="currentColor" d="M8 11.5c-.28 0-.5-.22-.5-.5V5c0-.28.22-.5.5-.5s.5.22.5.5v6c0 .28-.22.5-.5.5" />
          <path fill="currentColor" d="M11 8.5H5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h6c.28 0 .5.22.5.5s-.22.5-.5.5" />
        </svg>
      </button>
      <div className={`peer-focus:opacity-100 opacity-0  flex justify-between gap-4 transition-opacity duration-300 `}>
        <button onClick={() => dispatch(addTopic({chapterId,lessonId ,idx, topic: { ...initialTopic, name: 'code', content: {code:"//javascript",language:"javascript"}} }))}>
          <svg className="w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M4 19V7h16l.002 12z" />
            <path fill="currentColor" d="M9.293 9.293L5.586 13l3.707 3.707l1.414-1.414L8.414 13l2.293-2.293zm5.414 0l-1.414 1.414L15.586 13l-2.293 2.293l1.414 1.414L18.414 13z" />
          </svg> 
        </button>
        <button onClick={() => dispatch(addTopic({chapterId,lessonId, idx, topic: initialTopic }))}>
          <svg className="w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M1 2v3h2V4h2v5H3.5v2h5V9H7V4h2v1h2V2zm20 1h-7v2h6v14H4v-5H2v6a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1" />
          </svg>
        </button>
        <label onClick={() => setIndex(idx)} htmlFor="image-file" className="cursor-pointer">
            <svg className={`w-6 text-green-600`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.75 4A3.25 3.25 0 0 1 22 7.25v11.5A3.25 3.25 0 0 1 18.75 22H7.25A3.25 3.25 0 0 1 4 18.75v-6.248c.474.198.977.34 1.5.422v5.826q.001.313.103.594l5.823-5.701a2.25 2.25 0 0 1 3.02-.116l.128.116l5.822 5.702q.102-.28.104-.595V7.25a1.75 1.75 0 0 0-1.75-1.75h-5.826a6.5 6.5 0 0 0-.422-1.5zm-6.191 10.644l-.084.07l-5.807 5.687q.274.097.582.099h11.5c.203 0 .399-.035.58-.099l-5.805-5.686a.75.75 0 0 0-.966-.071M16.252 7.5a2.252 2.252 0 1 1 0 4.504a2.252 2.252 0 0 1 0-4.504M6.5 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m9.752 8a.752.752 0 1 0 0 1.504a.752.752 0 0 0 0-1.504M6.5 3l-.09.007a.5.5 0 0 0-.402.402L6 3.5V6H3.498l-.09.008a.5.5 0 0 0-.402.402l-.008.09l.008.09a.5.5 0 0 0 .402.402l.09.008H6v2.503l.008.09a.5.5 0 0 0 .402.402l.09.009l.09-.009a.5.5 0 0 0 .402-.402L7 9.503V7h2.505l.09-.008a.5.5 0 0 0 .402-.402l.008-.09l-.008-.09a.5.5 0 0 0-.403-.402L9.504 6H7V3.5l-.008-.09a.5.5 0 0 0-.402-.403z" />
          </svg>

          
        </label>
        <input type="file" name="" id="image-file" hidden onChange={(e) => setImage(e.target.files[0])} />
      </div>
    </div>
  )
}


  ;
