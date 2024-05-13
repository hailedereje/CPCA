import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postQuizObj, quizSuccess } from "../../Redux/action.js";

export const QuizQuestionForm = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const data = useSelector((state) => state.mernQuize.questions);
  const dispatch = useDispatch();

  const [ans, setAns] = useState([
    { option: "", isCorrect: false, id: 0 },
    { option: "", isCorrect: false, id: 1 },
    { option: "", isCorrect: false, id: 2 },
    { option: "", isCorrect: false, id: 3 },
  ]);

  const [quiz, setQuiz] = useState({
    title: "",
    questions: "",
    options: ans,
    correctAnswer: "",
  });

  const handleQuiz = (event) => {
    event.preventDefault();
    const findCorrectAnswer = () => {
      const correctOption = ans.find((option) => option.isCorrect);
      if (correctOption) {
        setQuiz({ ...quiz, correctAnswer: correctOption.option });
      }
    };

    findCorrectAnswer();
    dispatch(quizSuccess(quiz));
  };
  const handleUploadnew = (event) => {
    event.preventDefault();
    const obj = {
      title: data[0].title,
      questionArray: data,
    };

    dispatch(postQuizObj(obj));
  };
  const handleType = (id) => (event) => {
    const { name, value } = event.target;
    setAns(() =>
      ans?.map((item) =>
        item.id === id
          ? { ...item, [name]: value === "true" ? true : value }
          : item
      )
    );
    setQuiz({ ...quiz, options: ans });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPopupOpen(false);
  };

  return (
    <div classname="relative">
      <button
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setPopupOpen(!isPopupOpen)}
      >
        <AiOutlinePlus className="h-6 w-6 mr-2" />
        Add Questions
      </button>
      {isPopupOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex flex-col justify-center text-slate-50 p-10">
                <div className="flex text-yellow-500 w-96 font-bold font-serif mb-2 ml-12">
                  <h1 className="text-2xl ">ADD QUESTIONS </h1>
                  <img
                    src="./add.gif"
                    alt="add icon"
                    className="w-1/3 h-20 -mt-6"
                  />
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
                    placeholder="Question"
                    onChange={(event) =>
                      setQuiz({ ...quiz, questions: event.target.value })
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
                              handleType(x.id)(e);
                            }}
                          />
                          <select
                            className="form-select appearance-none
                block
                w-1/4
                px-3
              h-9
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            name="isCorrect"
                            id=""
                            v-model="allowMultiple"
                            value={x.boolean}
                            onChange={(e) => {
                              handleType(x.id)(e);
                            }}
                          >
                            <option value="">Select</option>
                            <option value={true}>true</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handleCancel}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                    >
                      Cancel
                    </button>
                    <div className="">
                      <button
                        onClick={handleQuiz}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                      >
                        Add
                      </button>
                      <button
                        onClick={handleUploadnew}
                        className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  ml-4 "
                      >
                        Upload
                      </button>
                    </div>
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
