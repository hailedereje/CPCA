import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import { toggleShow, updateTopic } from '../../features/course/topicSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DOMPurify from "dompurify"

 
  const defaultConfig = {
    documentReady: true,
    heightMax: 200,
    widthMax: 200,
    placeholderText: 'Edit Your Content Here!',
    attribution: false,
    spellcheck: true,
    // toolbarInline: true
    toolbarButtons: [
      'fullscreen', 'undo', 'redo', 'bold', 'italic', 'underline', 'backgroundColor', 'textColor', 'fontFamily', 'fontSize', 'align', 'formatBlock',
      'formatUL', 'formatOL', 'insertLink', 'indent', 'clearFormatting'
    ],
  };

export const TextEditor = ({topicItem}) => {
  const {id,content,name,show} = topicItem;
 
  const [value,setValue] = useState(content);
  const dispatch = useDispatch();

  const handleModel = (content) =>{
    setValue(content)
  }
    return (
      <>
      
        {  <div className={`fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-white transform transition-all duration-500 ${show ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div onClick={() => dispatch(toggleShow({id}))} className="absolute top-0 left-0 w-full h-full bg-black/60" />
            <div className="flex z-20 flex-col gap-4  h-fit bg-white rounded-xl">
                <FroalaEditorComponent tag='textarea'
                    model={value}
                    config={defaultConfig}
                    onModelChange={handleModel}
                />
                <div className="flex items-center justify-center gap-6">
                    <button onClick={() => {
                      const content = DOMPurify.sanitize(value)
                      dispatch(updateTopic({id,content}));
                      dispatch(toggleShow({id}));
                    }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        save
                    </button>
                    <button onClick={() => dispatch(toggleShow({id}))}  className="text-red-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   dark:border-gray-600 dark:hover:bg-white-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        cancel
                    </button>
                </div>
            </div>
        </div>}
        </>
    )
}