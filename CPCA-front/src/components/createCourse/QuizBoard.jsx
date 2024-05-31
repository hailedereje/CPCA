import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import FroalaEditor from 'react-froala-wysiwyg';
import DOMPurify from 'dompurify';
import { MdOutlineDescription } from 'react-icons/md';
import { defaultFroalaConfig } from '@/constants';
import { addInstruction } from '@/features/course/quizSlice';
import { useCreateQuiz } from './hooks/course-hooks';

const InstructionEditor = () => {
  const { instruction } = useSelector(state => state.quizState);
  const [value, setValue] = useState(instruction);
  const dispatch = useDispatch();
  const isChanged = instruction !== value;

  const handleSave = () => {
    const sanitizedContent = DOMPurify.sanitize(value);
    dispatch(addInstruction({ instruction: sanitizedContent }));
    setValue(sanitizedContent);
  };

  return (
    <div className="flex flex-col editor gap-3">
      <div className="relative">
        <FroalaEditor
          tag='div'
          model={value}
          config={defaultFroalaConfig}
          onModelChange={(content) => setValue(content)}
        />
        <div className="absolute top-3 right-0 flex z-10 items-center justify-center gap-6">
          {isChanged && (
            <button
              type='button'
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
              onClick={handleSave}
            >
              save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const quizSchema = yup.object().shape({
  title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(100, 'Title cannot be longer than 100 characters.'),
  duration: yup.number().required('Duration is required.').positive('Duration must be a positive number.').max(180, "A quiz can take a maximum of 3 hours."),
});

export const QuizBoard = () => {
  const param = useParams();
  const navigate = useNavigate()

  const { title, instruction, duration } = useSelector(state => state.quizState);
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(quizSchema) });
  const { errors, isLoading } = formState
 
  const { mutateAsync: createQuiz } = useCreateQuiz(param.id);

  const onSubmit = async (formData) => {
    try {
      await createQuiz({ courseId:param.id, chapterId: param.chapterId, ...formData, instruction })
        .then(result => console.log(result))
      // navigate("")
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
  };

  return (
    <div className="w-full p-6 dark:text-white max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-8">Create Quiz</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between gap-4'>
        <div className="flex items-start justify-between gap-4">
          <div className='flex flex-col gap-2'>
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
              <MdOutlineDescription />
              <span>Title</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-gray-200">
              Enter a descriptive and concise title for the quiz. This title should give participants a clear idea of the quiz topic or focus.
            </span>
            <input
              type="text"
              name="title"
              {...register('title')}
              className='outline-none p-1 ps-2 rounded text-sm dark:text-white dark:bg-gray-600 border border-gray-400 max-w-sm'
            />
            <p className='text-red-500 text-xs'>{errors.title?.message || ""}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
              <MdOutlineDescription />
              <span>Duration</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-gray-200">
              Specify the total time allowed for the quiz in minutes. This is the maximum amount of time participants will have to complete all quiz questions.
            </span>
            <input
              type="number"
              step={0.1}
              min={0.3}
              name="duration"
              {...register("duration")}
              className='outline-none p-1 ps-2 rounded text-sm dark:text-white dark:bg-gray-600 border border-gray-400 max-w-sm'
            />
            <p className='text-red-500 text-xs'>{errors.duration?.message || ""}</p>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <MdOutlineDescription />
            <span>Instruction</span>
          </span>
          <span className="text-xs lowercase line-clamp-2 text-gray-500 dark:text-gray-200">
            Provide clear and detailed instructions or guidelines for the quiz participants. Include important information such as how to answer questions, any rules they must follow, and what to do if they have technical issues.
          </span>
          <InstructionEditor />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 max-w-xs text-white px-6 py-1 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
