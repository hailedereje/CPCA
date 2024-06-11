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
import 'froala-editor/css/themes/gray.min.css';
import { IconWrapper } from './components/icon-wrapper';

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
        <FroalaEditor
          tag='div'
          model={value}
          config={{...defaultFroalaConfig,theme: 'gray', placeholderText: 'Write your instruction here.'}}
          onModelChange={(content) => setValue(content)}
        />
    </div>
  );
};

const quizSchema = yup.object().shape({
  title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(100, 'Title cannot be longer than 100 characters.'),
  duration: yup.number().required('Duration is required.').positive('Duration must be a positive number.').max(180, "A quiz can take a maximum of 3 hours."),
  instruction: yup.string().required('Instruction is required.').min(100, 'Instruction must be at least 10 characters long.'),
});

export const QuizBoard = () => {
  const param = useParams();
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const [quizForm, setQuizForm] = useState({
    title: '',
    duration: 15,
    instruction: '',
  });
 
  const { mutateAsync: createQuiz } = useCreateQuiz(param.id);

  const onSubmit = async (formData) => {
    try {
      setLoading(true)
      await quizSchema.validate(quizForm ).then(() => console.log('Validation passed'))

      await createQuiz({ courseId:param.id, chapterId: param.chapterId, ...quizForm})
        .then(result => {
          navigate(`${result.data.quiz._id}`)
        })

    } catch (error) {
      console.error("Failed to create quiz:", error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="w-full p-6 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center mb-8">Create Quiz</h2>
      <div  className='flex flex-col justify-between gap-4'>
        <div className="flex items-start justify-between gap-4">
          <div className='flex flex-col gap-2'>
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
            <IconWrapper icon={<MdOutlineDescription />} bg={"bg-blue-600"} color={"text-white"} size={5}/>
              <span>Title</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500 ">
              Enter a descriptive and concise title for the quiz. This title should give participants a clear idea of the quiz topic or focus.
            </span>
            <input
              type="text"
              name="title"
              onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              className='outline-none p-1 ps-2 rounded text-sm border border-gray-400 max-w-sm'
            />

          </div>
          <div className='flex flex-col gap-2'>
            <span className="text-xl capitalize font-medium flex gap-4 items-center">
              <IconWrapper icon={<MdOutlineDescription />} bg={"bg-blue-600"} color={"text-white"} size={5}/>
              <span>Duration</span>
            </span>
            <span className="text-xs lowercase line-clamp-2 text-gray-500">
              Specify the total time allowed for the quiz in minutes. This is the maximum amount of time participants will have to complete all quiz questions.
            </span>
            <input
              type="number"
              step={5}
              min={15}
              name="duration"
              onChange={(e) => setQuizForm({...quizForm, duration: e.target.value})}
              className='outline-none p-1 ps-2 rounded text-sm border border-gray-400 max-w-sm'
            />

          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <span className="text-xl capitalize font-medium flex gap-4 items-center">
          <IconWrapper icon={<MdOutlineDescription />} bg={"bg-blue-600"} color={"text-white"} size={5}/>
            <span>Instruction</span>
          </span>
          <span className="text-xs lowercase line-clamp-2 text-gray-500 ">
            Provide clear and detailed instructions or guidelines for the quiz participants. Include important information such as how to answer questions, any rules they must follow, and what to do if they have technical issues.
          </span>
          
          <div className="flex flex-col editor gap-3">
              <FroalaEditor
                tag='div'
                model={quizForm.instruction}
                config={{...defaultFroalaConfig,theme: 'gray', placeholderText: 'Write your instruction here.'}}
                onModelChange={(content) => setQuizForm({...quizForm, instruction: content})}
              />
          </div>

        </div>
        <button
          onClick={onSubmit}
          type="submit"
          className="bg-blue-500 h-10 max-w-xs text-white px-6 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {loading ? 'Creating Quiz...' : 'Create Quiz'}
        </button>
      </div>
    </div>
  );
};
