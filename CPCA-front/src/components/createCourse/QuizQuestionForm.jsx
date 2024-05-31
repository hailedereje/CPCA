/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import add from "../../assets/add.gif";
import newRequests from "@/utils/newRequest";

export const QuizQuestionForm = ({ selectedQuestion, handleCloseModal, handleUpdateQuestion }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [ans, setAns] = useState([
    { option: "", isCorrect: false, id: 0 },
    { option: "", isCorrect: false, id: 1 },
    { option: "", isCorrect: false, id: 2 },
    { option: "", isCorrect: false, id: 3 },
  ]);

  const initialState = {
    title: "",
    question: "",
    options: ans,
    correctAnswer: "",
  };
  const [quiz, setQuiz] = useState(initialState);
  console.log(quiz);
  useEffect(() => {
    if (selectedQuestion) {
      setAns(selectedQuestion.options.map((option, index) => ({
        ...option,
        id: index
      })));
      setQuiz(selectedQuestion);
      setPopupOpen(true);
    }
  }, [selectedQuestion]);

  useEffect(() => {
    setQuiz((prevQuiz) => ({ ...prevQuiz, options: ans }));
  }, [ans]);

  const handleQuiz = async (event) => {
    event.preventDefault();
    try {
      const response = await newRequests.post("/quiz_question", quiz);
      console.log(response.data);
      setQuiz(initialState);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleUpdate = (id, event) => {
    event.preventDefault();
    newRequests
      .put(`/quiz_question/${id}`, quiz)
      .then((response) => {
        setQuiz(initialState);
        setPopupOpen(false);
        handleUpdateQuestion(response.data)
      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  };

  const handleType = (id, event) => {
    const { name, value } = event.target;
    setAns((prevAns) =>
      prevAns?.map((item) =>
        item.id === id
          ? {
            ...item,
            [name]: name === "isCorrect" ? value === "true" : value,
          }
          : { ...item, isCorrect: false }
      )
    );
    if (name === "isCorrect") {
      if (value === "true") {
        const optionValue = ans.find((item) => item.id === id)?.option;
        setQuiz((prevQuiz) => ({ ...prevQuiz, correctAnswer: optionValue }));
      } else {
        setQuiz((prevQuiz) => ({ ...prevQuiz, correctAnswer: "" }));
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPopupOpen(false);
    handleCloseModal();
  };

  return (
    <div className="relative">
      <button
        className={
          selectedQuestion
            ? ""
            : "flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded mt-4"
        }
        onClick={() => setPopupOpen(!isPopupOpen)}
      >
        {selectedQuestion ? (
          ""
        ) : (
          <div className="flex items-center justify-center">
            <AiOutlinePlus className="h-6 w-6 mr-2" />
            Add Question
          </div>
        )}
      </button>
      {isPopupOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <span
                className="btn btn-ghost btn-circle cursor-pointer absolute text-3xl top-0 right-0 text-red-500"
                onClick={handleCancel}
              >
                &times;
              </span>
              <div className="flex flex-col justify-center p-10">
                <div className="flex text-yellow-500 w-96 font-bold font-serif mb-2 ml-12">
                  <h1 className="text-2xl ">
                    {selectedQuestion ? "Question Details" : "Add Question"}
                  </h1>
                  <img src={add} alt="add icon" className="w-1/3 h-20 -mt-6" />
                </div>
                <form className="-mt-6">
                  <label
                    className="block uppercase tracking-wide  text-xs font-bold"
                    htmlFor="grid-first-name"
                  >
                    Title{" "}
                  </label>
                  <input
                    className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Title"
                    value={quiz.title}
                    onChange={(event) => {
                      setQuiz({ ...quiz, title: event.target.value });
                    }}
                  />
                  <label
                    className="block uppercase tracking-wide text-xs font-bold"
                    htmlFor="grid-first-name"
                  >
                    Question{" "}
                  </label>
                  <input
                    className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    value={quiz.question}
                    placeholder="Question"
                    onChange={(event) =>
                      setQuiz({ ...quiz, question: event.target.value })
                    }
                  />
                  <label
                    className="block uppercase tracking-wide  text-xs font-bold"
                    htmlFor="grid-first-name"
                  >
                    Options
                  </label>
                  <div className="mb-3">
                    {ans?.map((x) => {
                      return (
                        <div key={x.id} className="flex  gap-1 ">
                          <input
                            className="w-3/4 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder={`Option ${x.id}`}
                            name="option"
                            value={x.option}
                            onChange={(e) => {
                              handleType(x.id, e);
                            }}
                          />
                          <select
                            className="form-select appearance-none  block  w-1/4  px-3  h-9  text-base  font-normal  text-gray-700  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="isCorrect"
                            value={x.isCorrect}
                            onChange={(e) => {
                              handleType(x.id, e);
                            }}
                          >
                            <option value="false">False</option>
                            <option value="true">True</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-10">
                    {selectedQuestion ? (
                      <button
                        onClick={(e) => handleUpdate(selectedQuestion._id, e)}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={handleQuiz}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                      >
                        Add
                      </button>
                    )}
                    <button
                      onClick={handleCancel}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
