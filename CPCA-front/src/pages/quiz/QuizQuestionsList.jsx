import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import newRequests from "@/utils/newRequest";
import Navbar from "@/components/coursePages/Navbar";
import { QuizQuestionForm } from "@/components/createCourse/QuizQuestionForm";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlinePlus } from "react-icons/ai";
import { stripHtmlTags } from "@/utils/html-striper";
import { useGetQuiz } from "@/components/createCourse/hooks/quiz-hooks";


export const QuizQuestionsWrapper = () => {
  const param = useParams()
  const { data, isLoading,isSuccess } = useGetQuiz(param.quizId)
 
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-transparent dark:text-white">
      {isSuccess ? <Outlet />:<div>Loading...</div>} 
    </div>
  );
}
      
const QuizQuestionsList = () => {
  const client = useQueryClient()
  const param = useParams()
  
  const data = client.getQueryData(['quiz', param.quizId])
 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  
  const navigate = useNavigate()

  const questions = data?.data.questions
  const totalPages = questions?.length

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-full p-4 dark:bg-transparent dark:text-white">
      {/* <Navbar /> */}
      {<div className="container p-4 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Quiz Questions</h2>
          <button onClick={() => navigate("question")} className="flex items-center justify-center bg-blue-500 p-2 rounded-md">
            <AiOutlinePlus className="h-6 w-6 mr-2" />
            Add Question
          </button>
        </div>
        <div className="relative w-full sm:w-1/2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title or description"
            className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500" />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-transparent">
          <QuestionsList questions={questions} />
          <div className="mx-auto p-4 flex max-w-md gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-full bg-gray-300 dark:bg-transparent"
            > 
              <MdNavigateBefore size={20} />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="p-2 rounded-full bg-gray-300 dark:bg-transparent"
            >
              <MdNavigateNext size={20} />
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default QuizQuestionsList;


const QuestionsList = ({ questions }) => {
  const navigate = useNavigate();
  const param = useParams()
  const {chapterId,quizId} = param
  const [data, setData] = useState(questions);
  const [editQuestionId, setEditQuestionId] = useState(null);

  const handleDelete = (id) => {
    const updatedQuestions = data.filter((question) => question.id !== id);
    setData(updatedQuestions);
  };

  return (
    <div className="max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">Questions List</h1>
      <ul className="divide-y divide-gray-200">
        {data?.map((question, index) => (
          <li key={question._id} className="flex items-center justify-between py-4 px-2 shadow-md ">
            <div className="flex items-center">
              <span className="mr-4 text-lg font-semibold">{index + 1}.</span>
              <span className="line-clamp-1 text-md">
                {stripHtmlTags(question.question)}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() =>navigate(`question/${question._id}`)}
                className="text-blue-600 hover:text-blue-900"
              >
                <BsPencilSquare />
              </button>
              <button
                onClick={() => handleDelete(question._id)}
                className="text-red-600 hover:text-red-900"
              >
                <BsTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

