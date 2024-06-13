import { defaultFroalaConfig } from "@/constants"
import { useState } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import 'froala-editor/css/themes/dark.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { AiOutlineEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddDescription } from "../hooks/course-hooks";

export const ContentEditor = ({courseId }) => {
    const client = useQueryClient();
    const initialValue = client.getQueryData(['course', courseId]).data.course.description 

    const [value, setValue] = useState(initialValue)
    const [isEditing, setIsEditing] = useState(false)

    const { mutateAsync: postDescription, isPending } = useAddDescription(courseId)
  
    const action = async (data) => {
      try {
        await postDescription(data)
      } catch (error) {
        console.log(error)
      }finally{
        setIsEditing(false)
      }
  
    }

    return (
      <div className="flex flex-col w-full editor gap-3">
          <div className={` flex items-center justify-center `}>
            <div className="w-full relative">
              <FroalaEditor tag='div'
                model={value}
                config={defaultFroalaConfig}
                onModelChange={(editorValue) => setValue(editorValue)}
              />
              <div className="absolute w-fit top-3 right-0 flex z-50">
              <button
                type='button'
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
                onClick={() => {
                  action({courseId, description:value })
                }}
              >
                {isPending ?  "saving":"save"}
              </button>
              </div>
            </div>
          </div> 
      </div>
    )
  }