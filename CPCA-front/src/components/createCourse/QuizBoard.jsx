import { defaultFroalaConfig } from '@/constants';
import { addInstruction } from '@/features/course/quizSlice';
import newRequests from '@/utils/newRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup"



const InstructionEditor = () => {
  const { instruction } = useSelector(x => x.quizState)
  const [value, setValue] = useState(instruction)
  const dispatch = useDispatch()
  const isChanged = instruction !== value

  return (
    <div className="flex flex-col w-fit editor gap-3">
      <div className={`w-full relative`}>
        <FroalaEditor tag='div'
          model={value}
          config={defaultFroalaConfig}
          onModelChange={(content) => setValue(content)
          }
        />
        <div className="absolute top-3 right-0 flex z-10 items-center justify-center gap-6">
          {isChanged && 
          <button 
            type='button'
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
            onClick={() => {
              const content = DOMPurify.sanitize(value)
              dispatch(addInstruction({instruction:content}))
              setValue(content)
            }}
          >
            save
          </button>}
        </div>
      </div>
    </div>
  )
}

const quizSchema = yup.object().shape({
  title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(10, 'Title cannot be longer than 100 characters.'),
  duration: yup.number().required('Duration is required.').positive('Duration must be a positive number.').max(3, "a quiz takes maximum of 3 hours"),
  instruction: yup.string().required('Instruction is required.').min(100, 'Instruction must be at least 100 characters long.'),
});

export const QuizBoard = () => {
  const { title, instruction, duration } = useSelector(x => x.quizState)
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(quizSchema) })
  const { isLoading, errors } = formState

  const [formData, setFormData] = useState({
    title: title,
    duration: duration,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await newRequests.post("/new", { title, duration, instruction }).then(() => {
      console.log("success")
    }).catch(() => {
      console.log("error")
    })
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full  p-6">
      <h2 className="text-3xl font-semibold mb-4">Create Quiz</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between gap-4'>
        <div className="flex items-start justify-between max-w-lg gap-4">
          <div className='basis-1/2'>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              {...register('title')}
              className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            />
            <p className='text-red-500 text-xs'>{errors.name?.message || ""}</p>
          </div>
          <div className='basis-1/2'>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="number"
              step={0.1}
              min={.3}
              name="duration"
              id="duration"
              {...register("duration")}
              className="mt-1 p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            />
            <p className='text-red-500 text-xs'>{errors.author?.message || ""}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="instruction" className="block mb-2 text-sm font-medium text-gray-700">
            Instruction
          </label>
          <InstructionEditor />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 ml-auto text-white px-6 py-1 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

