import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequests from "@/utils/newRequest";
import Navbar from "@/components/coursePages/Navbar";
import AddQuestionForm from "./PracticeQuestionForm";
import { FaSearch } from "react-icons/fa";
import Confirmation from "@/components/createCourse/components/confirmationDialog";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const navigate = useNavigate(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await newRequests.get("/practice_question", {
          params: {
            page: currentPage,
            search: searchTerm,
            difficulty: difficultyFilter,
          },
        });
        console.log(response.data);
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [currentPage, searchTerm, difficultyFilter]);

  const handlePractice = (id) => {
    navigate(`/practice_question/${id}`);
  };

  const handelDetails = (question) => {
    setShowDetails(true);
    setSelectedQuestion(question);
  };

  const handleDelete = (id) => {
    newRequests
      .delete(`/quiz_question/${id}`)
      .then((response) => {
        console.log(response.data);
        setQuestions(questions.filter((question) => question._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedQuestion("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="pt-20">
      <Confirmation/>
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-2xl font-bold">Practice Questions</h2>
          <AddQuestionForm />
        </div>
        <div className="mb-4 flex container mx-auto gap-10">
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by title"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <FaSearch className="absolute right-3 top-3 dark:text-white" />
          </div>
          <select
            value={difficultyFilter}
            onChange={handleDifficultyChange}
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="w-full mt-4 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/7 pt-2 pb-3 text-center">NO.</th>
                <th className="w-1/7 pt-2 pb-3 text-left">Title</th>
                <th className="w-2/7 pt-2 pb-3 text-left">Description</th>
                <th className="w-1/7 pt-2 pb-3 text-left">Difficulty</th>
                <th className="w-2/7 pt-2 pb-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                  key={index}
                >
                  <td className="w-1/10 pt-2 pb-2 text-center">{index + 1}</td>
                  <td className="w-2/10 pt-2 pb-2">
                    <Link
                      to={`/practice_question/${question._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {question.title}
                    </Link>
                  </td>
                  <td className="w-3/10 pt-2 pb-2">{question.description}</td>
                  <td className="w-2/10 pt-2 pb-2">{question.difficulty}</td>
                  <td className="w-2/10 pt-2 pb-2 flex gap-2">
                    <button
                      className="block rounded-lg bg-gradient-to-tr from-blue-800 to-blue-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handelDetails(question)}
                    >
                      Details
                    </button>
                    <button
                      className="block rounded-lg bg-gradient-to-tr bg-blue-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handlePractice(question._id)}
                    >
                      Practice
                    </button>
                    <button
                      className="block rounded-lg bg-gradient-to-tr from-red-800 to-red-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handleDelete(question._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-10 items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </div>
      {showDetails && selectedQuestion && (
        <AddQuestionForm
          selectedQuestion={selectedQuestion}
          handleCloseModal={handleCloseModal}
          handleUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </div>
  );
};

export default QuestionsList;
