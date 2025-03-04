import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { stripHtmlTags } from "@/utils/html-striper";
import { useGetQuiz } from "@/components/createCourse/hooks/quiz-hooks";
import { useDispatch } from "react-redux";
import { openConfirmationDialog } from "@/features/course/coursSidebarSlice";
import { act } from "react";
import Confirmation from "@/components/createCourse/components/confirmationDialog";
import { ActionTypes } from "@/components/createCourse/action.Types";

export const QuizQuestionsWrapper = () => {
  
  return (
    <div className="min-h-screen w-full bg-gray-100 text-black">
      <Outlet />
    </div>
  );
};

const QuizQuestionsList = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetQuiz(param.quizId);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  
  // if(isSuccess) {
  //   questions = data?.data.questions;
  //   totalPages = questions?.length;
  // }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-full p-4">
      <Confirmation />
      <div className="container p-4 rounded-md ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 text-center">Quiz Questions</h2>
          <button
            onClick={() => navigate("question")}
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md"
          >
            <AiOutlinePlus className="h-6 w-6 mr-2" />
            Add Question
          </button>
        </div>
        <div className="relative w-full md:w-1/2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title or description"
            className="shadow-sm appearance-none border border-gray-300 rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500" />
        </div>
        {isSuccess && <div className="shadow-md rounded-lg overflow-hidden bg-white">
          <div className="md:max-w-4xl p-4 w-full">
            <h1 className="text-2xl text-centerfont-bold mb-4 text-gray-800">Questions List</h1>
            {data.data.questions.length !== 0 ? (
              <ul className="divide-y divide-gray-200">
                {data.data.questions?.map((question, index) => (
                  <li
                    key={question._id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 px-2 bg-white shadow-sm rounded-lg mb-2 md:mb-0"
                  >
                    <div className="flex items-start md:items-center">
                      <span className="mr-4 text-lg font-semibold">{index + 1}.</span>
                      <span className="line-clamp-1 text-md text-gray-800">
                        {stripHtmlTags(question.question)}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2 md:mt-0">
                      <button
                        onClick={() => navigate(`question/${question._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        onClick={() => dispatch(openConfirmationDialog({ actionType: ActionTypes.DELETE_QUESTION, message: "Are you sure you want to delete this question?", questionId: question._id }))}
                        className="text-red-600 hover:text-red-900"
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">No questions found</div>
            )}
          </div>
          {/* <div className="mx-auto p-4 flex max-w-md gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-full bg-gray-300"
            >
              <MdNavigateBefore size={20} />
            </button>
            <span className="text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 rounded-full bg-gray-300"
            >
              <MdNavigateNext size={20} />
            </button>
          </div> */}
        </div>}
      </div>
    </div>
  );
};

export default QuizQuestionsList;

// const QuestionsList = ({ questions }) => {
//   const client = useQueryClient();
//   const param = useParams();

//   const data = client.getQueryData(['quiz', param.quizId]);
//   console.log(data)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { chapterId, quizId } = param;
//   const [data, setData] = useState(questions);

//   return (
//     <div className="md:max-w-4xl p-4 w-full">
//       <h1 className="text-2xl text-centerfont-bold mb-4 text-gray-800">Questions List</h1>
//       {data.data.questions.length !== 0 ? (
//         <ul className="divide-y divide-gray-200">
//           {data.data.questions?.map((question, index) => (
//             <li
//               key={question._id}
//               className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 px-2 bg-white shadow-sm rounded-lg mb-2 md:mb-0"
//             >
//               <div className="flex items-start md:items-center">
//                 <span className="mr-4 text-lg font-semibold">{index + 1}.</span>
//                 <span className="line-clamp-1 text-md text-gray-800">
//                   {stripHtmlTags(question.question)}
//                 </span>
//               </div>
//               <div className="flex gap-4 mt-2 md:mt-0">
//                 <button
//                   onClick={() => navigate(`question/${question._id}`)}
//                   className="text-blue-600 hover:text-blue-900"
//                 >
//                   <BsPencilSquare />
//                 </button>
//                 <button
//                   onClick={() => dispatch(openConfirmationDialog({ actionType: ActionTypes.DELETE_QUESTION, message: "Are you sure you want to delete this question?", questionId: question._id}))}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   <BsTrash />
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className="text-center text-gray-500">No questions found</div>
//       )}
//     </div>
//   );
// };
