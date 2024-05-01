import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';
import 'froala-editor/js/plugins/image.min.js'

import FroalaEditor from 'react-froala-wysiwyg';
import { toggleShow, updateTopic } from '../../features/course/topicSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DOMPurify from "dompurify"

 


export const TextEditor = ({topicItem}) => {
  const {id,name,show} = topicItem;
  const [value,setValue] = useState('');
  const dispatch = useDispatch();

  const defaultConfig = {
    documentReady: true,
    heightMax: 200,
    widthMax: 200,
    placeholderText: 'Edit Your Content Here!',
    attribution: false,
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
                    const image = `<img src=${secureUrl} alt='image'>`
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
    
    toolbarButtons: [
      'insertImage','fullscreen', 'undo', 'redo', 'bold', 'italic', 'underline', 'backgroundColor', 'textColor', 'fontFamily', 'fontSize', 'align', 'formatBlock',
      'formatUL', 'formatOL', 'insertLink', 'indent', 'clearFormatting'
    ],

  };

  const handleModel = (content) =>{
    setValue(content)
  }

  console.log(value)
    return (
      <>
      
        {  <div className={`fixed flex items-center justify-center  z-10 top-0 left-0 w-screen h-screen bg-white transform transition-all duration-500 ${show ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div onClick={() => dispatch(toggleShow({id}))} className="absolute top-0 left-0 w-full h-full bg-black/60" />
            <div className="flex z-20 flex-col gap-4  h-fit bg-white rounded-xl">
                <FroalaEditor tag='textarea'
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