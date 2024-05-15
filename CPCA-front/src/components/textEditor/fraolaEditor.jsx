import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/table.min.js'

import FroalaEditor from 'react-froala-wysiwyg';
import { toggleShow, updateTopic } from '../../features/course/createCourse';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import DOMPurify from "dompurify"

 


export const TextEditor = ({chapterId,lessonId,topicItem}) => {
  const { id,content,show } = topicItem;
  const [value,setValue] = useState(content);
  const dispatch = useDispatch();

  const defaultConfig = {
    documentReady: true,
    placeholderText: 'Edit Your Content Here!',
    maxHeight:200,
    attribution: false,
    wordCounterCount: false,
    spellcheck: true,
    // lineBreakerOffset: 10, // Default offset
    // lineBreakerOffsetMD: 20, // Offset for medium screens
    // lineBreakerOffsetSM: 15, // Offset for small screens
    // lineBreakerOffsetXS: 5,
    imageUpload: true,
        imageUploadParams:{
            upload_preset: "dgyt48cy"
        } ,
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        imageUploadURL: "https://api.cloudinary.com/v1_1/dygzy1vri/image/upload",
        events: {
            'image.beforeUpload': function (files) {
                console.log('Before Upload:');
            },
            'image.uploaded': function (response) {
                    console.log(this)
                    const responseData = JSON.parse(response);
                    const secureUrl = responseData.secure_url;
                    const image = `<img src=${secureUrl} alt='image style={{object-fit: cover}}'>`
                    setValue(prev => `${prev + image}`)                
            },
            'image.inserted': function ($img, response) {
    
            },
            'image.replaced': function ($newImg, $oldImg) {
               
            },
            'image.error': function (error, response) {
                // Error occurred during image upload
                // console.error('Image Error:', error, response);
            }
        },
    
    toolbarButtons: {
        'moreMisc': {
            buttons: ['fullscreen', 'undo', 'redo', 'print', 'spellChecker', 'codeView', 'html'],
          },
        'moreText': {
          buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
        },
        'moreParagraph': {
          buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        },
        'moreRich': {
          buttons: ['insertImage', 'insertLink', 'insertTable', 'insertHR', 'embedly', 'specialCharacters'],
        },
        
      },
    
    

  };
  const handleModel = (content) =>{
    setValue(content)
  }
    return (
      <>
        {  <div className={`fixed z-30 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${show ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div onClick={() => dispatch(toggleShow({chapterId,lessonId,topicId:topicItem.id}))} className="absolute top-0 left-0 w-full h-full bg-black/90" />
            <div className="flex z-10 flex-col items-start gap-4 h-full  bg-white editor relative ">
                <FroalaEditor tag='div'
                    model={value}
                    config={defaultConfig}
                    onModelChange={handleModel}
                />
                 
                <div className="absolute bottom-3 right-0 flex z-10 items-center justify-center gap-6">
                    <button onClick={() => {
                      const content = DOMPurify.sanitize(value)
                      dispatch(updateTopic({chapterId,lessonId,topicId:topicItem.id,content}))
                      dispatch(toggleShow({chapterId,lessonId,topicId:topicItem.id}));
                    }} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
                    >
                        save
                    </button>
                    <button onClick={() => {
                        dispatch(toggleShow({chapterId,lessonId,topicId:topicItem.id}))
                        setValue(content)
                        }}  className="border hover:border-red-400 text-red-500 text-sm py-1 px-3 rounded mr-2"
                        >
                        cancel
                    </button>
                </div>
            </div>
        </div>}
        </>
    )
}




