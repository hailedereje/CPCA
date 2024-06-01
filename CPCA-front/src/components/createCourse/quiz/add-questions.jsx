import { defaultFroalaConfig } from "@/constants";
import { nanoid } from "@reduxjs/toolkit";
import DOMPurify from "dompurify";
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEdit, FaPlus, FaRegCheckCircle, FaRegCheckSquare, FaRegCircle, FaRegSquare, FaSave, FaTrash } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useCreateQuestion, useGetQuiz, useUpdateQuestion } from "../hooks/quiz-hooks";
import { useParams } from "react-router-dom";
import { addChoices } from "@/features/course/quizSlice";
import * as yup from 'yup';
import { useCreateQuiz } from "../hooks/course-hooks";
import { useQueryClient } from "@tanstack/react-query";

const questionValidation = yup.object().shape({
  question: yup.string().required('Question is required'),
  options: yup.array().required("choices are required").of(
    yup.object().shape({
      option: yup.string().required('Option is required'),
      isCorrect: yup.boolean().required('Correctness is required')
    }).required("Choice is required")
  ).min(2, "At least two choice is required"),
  quizId: yup.string().required('QuizId is required')
});


export const AddQuestion = () => {
  const client = useQueryClient()
  const param = useParams();
  const { quizId,questionId } = param
  let data = {}
  
  if(!!questionId){
    data = client.getQueryData(['quiz', quizId]).data.questions.find(question => question._id === questionId)
  }
  const [value, setValue] = useState(data.question || '');
  const [error,setError] = useState('')
  const [isEditing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [choices, setChoices] = useState(data?.options?.map(option => ({...option,id:nanoid()})) || []);
  const [newChoice, setNewChoice] = useState({ id: nanoid(), option: '', isCorrect: false });
  const [editingChoice, setEditingChoice] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);  
  const isChanged = value !== data.question || !deepEqualArray(choices, data.options);

  const { mutateAsync: createQuestion } = useCreateQuestion(quizId)
  const { mutateAsync: updateQuestion } = useUpdateQuestion(quizId)

  const onSubmit = async() => {
    try {
      setLoading(true)
      await questionValidation.validate({ question: value,options:choices.map(choice => ({option:choice.option,isCorrect:choice.isCorrect})), quizId }).catch(err => {
        setError(err.message)
        throw new Error(err.message)
      })
      if(correctAnswerIndex === null){
        setError("Please set the correct answer")
        return 
      }
      if(!!questionId){
        const data = { question: value, options:choices,questionId,quizId }
        await updateQuestion({data,questionId}).then(result => console.log("updated",result))
      }
      else{
        await createQuestion({ question: value, options:choices, quizId }).then(result => console.log(result))
      }
      
    }catch(err){
      console.log(err.message)
    }finally{
      setLoading(false)
    }
    
  }
  const handleNewChoiceChange = (e) => {
    setNewChoice({ ...newChoice, option: e.target.value });
  };

  const addNewChoice = () => {
    if (newChoice.option.trim()) {
      setChoices(prev => {
        const newChoices = [...prev, newChoice];
        dispatch(addChoices({ options: newChoices }))
        return newChoices;
      });
      setNewChoice({ id: nanoid(), option: '', isCorrect: false });
    }
  };

  const toggleEditChoice = (choice) => {
    setEditingChoice(choice);
  };

  const saveEditChoice = () => {
    setChoices(prevChoices =>
      prevChoices.map(choice =>
        choice.id === editingChoice.id ? editingChoice : choice
      )
    );
    setEditingChoice(null);
  };

  const handleEditChange = (e) => {
    setEditingChoice({ ...editingChoice, option: e.target.value });
  };

  const deleteChoice = (choiceId) => {
    setChoices(prevChoices => prevChoices.filter(choice => choice.id !== choiceId));
    setCorrectAnswerIndex(null)
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswerIndex(index);
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index
    }));
    setChoices(newChoices);
  };

  return (
    <div className="w-full p-6">
      <div className="w-full flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4">
          {isEditing ?
          <div className={`fixed z-30 flex items-center justify-center top-0 left-0 w-screen h-screen  transform transition-all duration-500`}>
            <div onClick={() => setEditing(false)} className="absolute top-0 left-0 w-full h-full bg-black/50" />
            <div className="flex items-center justify-center gap-4 w-1/2 max-w-2/3 min-w-[300px] p-2  relative ">
              <FroalaEditor tag='div'
                model={value}
                config={defaultFroalaConfig}
                onModelChange={(editorValue) => setValue(editorValue)}
              />
              <div className="absolute top-3 right-0 flex z-10 items-center justify-center gap-6">
                <button onClick={() => {
                  setEditing(false)
                }} className="bg-blue-500 capitalize hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2 min-w-16" >
                  finish
                </button>
              </div>
            </div>
          </div>
          :
          <div className="flex flex-col gap-2 max-w-2xl dark:bg-gray-600 p-2 rounded-md">
            <span className="flex flex-col gap-2">
              <span className="text-xl capitalize font-medium flex gap-4 items-center">
                <span>
                  <MdOutlineDescription />
                </span>
                <span >Question</span>
              </span>
              <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
            </span>
            <div className="min-h-16 w-full overflow-auto editor border relative p-4 rounded-md text-sm text-gray-100">
              <FroalaEditorView model={value} />
              <button className="absolute right-0 top-0 p-2 rounded-full bg-black/40" onClick={() => setEditing(true)}>
                <AiOutlineEdit size={20} className="text-blue-400" />
              </button>
            </div>
          </div>}
    
        <div className="flex flex-col gap-4 max-w-2xl dark:bg-gray-600 p-2 rounded-md">
          <span className="flex flex-col gap-2">
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
              <span>
                <MdOutlineDescription />
              </span>
              <span >Choice</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem perspiciatis consequatur qui numquam veniam similique rem ut esse architecto.</span>
          </span>
          <div className="w-full max-w-2xl flex flex-col gap-4 border rounded-md p-4 shadow-lg">
            <div className="flex justify-between items-center mb-6 ">
              <div className="bg-green-400 text-gray-700 px-4 py-2 rounded-md font-semibold">
                {choices.length} choices created
              </div>
              {/* <DropdownMenu label="Add">
                {choices?.map((choice, index) => (
                  <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <button>
                      <span>{choice.option}</span>
                    </button>
                  </li>
                ))}
              </DropdownMenu> */}
            </div>
            {(
              <div className="flex flex-col gap-4">
                {choices.map((choice,index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <button onClick={() => handleCorrectAnswerChange(index)}>
                      <span>
                        {choice.isCorrect ? <FaRegCheckCircle size={20} /> : <FaRegCircle size={20} />}
                      </span>
                    </button>
                    {editingChoice && editingChoice.id === choice.id ? (
                      <div className="flex gap-2 items-center w-full max-w-sm">
                        <textarea
                          className="text-sm p-2 w-full max-w-sm outline-none bg-transparent border-b focus:border-blue-500 resize-none overflow-hidden"
                          value={editingChoice.option}
                          onChange={handleEditChange}
                          rows={1}
                        />
                        <button
                          onClick={saveEditChoice}
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between gap-2 items-center w-full max-w-sm">
                        <span className="text-sm line-clamp-2 capitalize">{choice.option}</span>
                        <div className="flex gap-4 items-center">
                          <button
                            onClick={() => toggleEditChoice(choice)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteChoice(choice.id)}
                          >
                            <FaTrash className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
                <div className="flex gap-4 items-center w-full max-w-sm">
                  <span><FaRegCircle size={20} /></span>
                  <textarea
                    placeholder="Enter choice"
                    className="text-sm p-2 w-full outline-none bg-transparent border-b focus:border-blue-500 resize-none capitalize"
                    value={newChoice.option}
                    onChange={handleNewChoiceChange}
                    rows={1}
                  />
                  <button
                    onClick={addNewChoice}
                    className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
        
        <ErrorBanner message={error} />
        <button
            onClick={onSubmit}
            disabled={!isChanged}
            className={`w-full max-w-xs flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1  focus:ring-indigo-500 ${isChanged ? '' :'cursor-not-allowed'}`}
        >
            {loading ? <span><AiOutlineLoading3Quarters className='animate-spin text-center' /></span> : <span>save</span>}
        </button>
      </div>
    </div>
  );
};


const DropdownMenu = ({ label, children }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button className="border border-gray-300 rounded-sm w-20 px-2 py-1 " onClick={() => setIsMenuOpen(prev => !prev)}>
        {label}
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}
      {isMenuOpen && (
        <div className="absolute top-10 left-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 dark:bg-gray-600 dark:text-white dark:border-black">
          <ul onClick={() => setIsMenuOpen(false)} className="list-none p-0 m-0">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { IoWarningOutline } from "react-icons/io5";
import { deepEqualArray } from "@/utils/comparator";

const ErrorBanner = ({ message }) => {
  if (!message) return null;

  return (
    <div className={` rounded p-4 border-red-400`} role="alert">
      <div className="flex items-center gap-4 text-red-500">
        <span className="text-lg"><IoWarningOutline /></span>
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default ErrorBanner;




