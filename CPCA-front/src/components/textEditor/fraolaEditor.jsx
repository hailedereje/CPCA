import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/table.min.js'

import FroalaEditor from 'react-froala-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DOMPurify from "dompurify"
import { closeEditor, setLessonItemValue } from '@/features/course/coursSidebarSlice';
import { useAddLessonItem, useUpdateLessonItem } from '../createCourse/hooks/course-hooks';
import { ActionTypes } from '../createCourse/action.Types';

export const TextEditor = ({lessonId}) => {
  const  {showTextEditor,lessonItem}  = useSelector(x => x.courseInputState)
  const { lessonItemId,actionType,idx } = lessonItem
  const value = lessonItem.value.content
  
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();

  const { mutateAsync: postLessonItem,isPending } = useAddLessonItem(lessonId)
  const { mutateAsync: updateLessonItem, } = useUpdateLessonItem(lessonId)

  // const [value,setValue] = useState(lessonItem.value.content);

  const actions = {
    addLessonItem: async(data) => await postLessonItem(data),
    editLessonItem: async(data) => await updateLessonItem(data)
}
const onSubmit = async() => {
    try {
        setLoading(true)
        switch (actionType) {
            case ActionTypes.ADD_LESSON_ITEM:
                await actions.addLessonItem({lessonId,type:'text',value: {language:'english',content:value},idx})
                break
            case ActionTypes.UPDATE_LESSON_ITEM:
                await actions.editLessonItem({lessonId,lessonItemId,type:'text',value: {language:'english',content:value},idx})
                break
        }
        setLoading(false)
        dispatch(closeEditor())
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
      
}

  const defaultConfig = {
    
    toolbarSticky: true,
    documentReady: true,
    heightMax: 300,
    widthMax: 20,
    placeholderText: 'Edit Your Content Here!',
    attribution: false,
    wordCounterCount: false,
    lineBreakerOffset: 0,
    lineBreakerOffsetMD: 10,
    lineBreakerOffsetSM: 5,
    lineBreakerOffsetXS: 5,
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

    return (
      <>
        {showTextEditor &&  <div className={`fixed z-30 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500 ${showTextEditor ? 'scale-100 ' : 'scale-40 hidden'}`}>
            <div  className="absolute top-0 left-0 w-full h-full bg-black/30" />
            <div className="flex items-center justify-center gap-4 w-1/2  bg-red-400 relative ">
                <FroalaEditor tag='div'
                    model={value}
                    config={defaultConfig}
                    onModelChange={(editorValue) => dispatch(setLessonItemValue(({language:'english',content:editorValue})) ) }
                />
                <div className="absolute bottom-3 right-0 flex z-10 items-center justify-center gap-6">
                    <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2 min-w-16" >
                        {loading ? "saving...":"save"}
                    </button>
                    <button onClick={() => dispatch(closeEditor())} className="border hover:border-red-400 text-red-500 text-sm py-1 px-3 rounded mr-2"
                        >
                        cancel
                    </button>
                </div>
            </div>
        </div>}
        </>
    )
}




