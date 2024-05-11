import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/table.min.js'

import FroalaEditor from 'react-froala-wysiwyg';
import { toggleShow, updateTopic } from '../../features/course/createCourse';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DOMPurify from "dompurify"

 


export const TextEditor = ({chapterId,lessonId,topicItem}) => {
  const { id,content,show } = topicItem;
  const [value,setValue] = useState(content);
  const dispatch = useDispatch();
  
  const defaultConfig = {
    documentReady: true,
    heightMax: 400,
    widthMax: 200,
    placeholderText: 'Edit Your Content Here!',
    attribution: false,
    wordCounterCount: false,
    spellcheck: true,
    imageUpload: true,
        imageUploadParams:{
            upload_preset: "dgyt48cy"
        } ,
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        imageUploadURL: "https://api.cloudinary.com/v1_1/dygzy1vri/image/upload",
        events: {
            'image.beforeUpload': function (files) {
                console.log('Before Upload:', files);
            },
            'image.uploaded': function (response) {
                    console.log(this)
                    const responseData = JSON.parse(response);
                    const secureUrl = responseData.secure_url;
                    const image = `<img src=${secureUrl} alt='image style={{object-fit: cover}}'>`
                    setValue(prev => `${prev + image}`)
                    
                    // this.image.insert(secureUrl,null,null,this.image.get(0)); 
                
            },
            'image.inserted': function ($img, response) {
                console.log($img)
                console.log('Inserted:', $img, response);
            },
            'image.replaced': function ($newImg, $oldImg) {
                console.log('Replaced:', $newImg, $oldImg);
            },
            'image.error': function (error, response) {
                // Error occurred during image upload
                console.error('Image Error:', error, response);
            }
        },
    
    // toolbarButtons: [
    //   'insertImage','fullscreen', 'undo', 'redo', 'bold', 'italic', 'underline', 'backgroundColor', 'textColor', 'fontFamily', 'fontSize', 'align', 'formatBlock',
    //   'formatUL', 'formatOL', 'insertLink', 'indent', 'clearFormatting'
    // ],
    toolbarButtons: {
        'moreMisc': {
            // Buttons for miscellaneous actions
            buttons: ['fullscreen', 'undo', 'redo', 'print', 'spellChecker', 'codeView', 'html'],
          },
        'moreText': {
          // Buttons related to text formatting
          buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
        },
        'moreParagraph': {
          buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        },
        'moreRich': {
          // Buttons related to rich content elements
          buttons: ['insertImage', 'insertLink', 'insertVideo', 'insertTable', 'insertHR', 'embedly', 'specialCharacters'],
        },
        
      },
    
    

  };
  const handleModel = (content) =>{
    setValue(content)
  }
    return (
      <>
        {  <div className={`fixed z-20 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${show ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div onClick={() => dispatch(toggleShow({chapterId,lessonId,topicId:topicItem.id}))} className="absolute top-0 left-0 w-full h-full bg-black/90" />
            <div className="flex z-10 flex-col gap-4  h-fit bg-white rounded-xl editor">
                <FroalaEditor tag='textarea'
                    model={value}
                    config={defaultConfig}
                    onModelChange={handleModel}
                />
                 
                <div className="flex z-10 items-center justify-center gap-6">
                    <button onClick={() => {
                      const content = DOMPurify.sanitize(value)
                      dispatch(updateTopic({chapterId,lessonId,topicId:topicItem.id,content}))
                      dispatch(toggleShow({chapterId,lessonId,topicId:topicItem.id}));
                    }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        save
                    </button>
                    <button onClick={() => {
                        dispatch(toggleShow({chapterId,lessonId,topicId:topicItem.id}))
                        setValue(content)
                        }}  className="text-red-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   dark:border-gray-600 dark:hover:bg-white-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        cancel
                    </button>
                </div>
            </div>
        </div>}
        </>
    )
}




