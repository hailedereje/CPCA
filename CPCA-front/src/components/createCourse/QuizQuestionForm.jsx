import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "@/features/course/quizSlice.js";
import { api } from "@/api/index.js";
import { store } from "@/store";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const QuizQuestionForm = (quizId) => {
  const id = quizId;
  const data = useSelector((state) => state.quizSlice.questions);
  const dispatch = useDispatch();

  const [options, setOptions] = useState([
    { option: "", isCorrect: false, id: 0 },
    { option: "", isCorrect: false, id: 1 },
    { option: "", isCorrect: false, id: 2 },
    { option: "", isCorrect: false, id: 3 },
  ]);

  const [question, setQuestion] = useState({
    title: "",
    question: "",
    options: options,
    correctAnswer: "",
  });

  const hundleSubmit = (event) => {
    event.preventDefault();
    dispatch(addQuestion(question));
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if(data){
      try {
        const result = await store
        .dispatch(api.endpoints.addQuestion.initiate(data, id))
        .unwrap();
        console.log(result);
        if (result) {
          toast.success("Questions Uploded successfully");
          return redirect("/");
        }
      } catch (err) {
        console.log(err);
        const errorMessage =
          err?.data?.msg || "Server Error. Please try again later.";
        toast.error(errorMessage);
      }
    } else {
      alert("Please add a question first");
    }
  };
  const handleType = (id) => (event) => {
    const { name, value } = event.target;
    setOptions(() =>
      options?.map((item) =>
        item.id === id
          ? { ...item, [name]: value == "true" ? true : value }
          : item
      )
    );
    setQuestion({ ...question, options: options });
  };

  return (
    <div className="w-10/12 flex  text-slate-50">
      <div className="w-1/2 mt-24 ml-32">
        <img className="h-80 pl-36 mt-8" src="./feedback.gif" alt="feedback" />
      </div>

      <div className="">
        <div className="flex text-yellow-500  w-96 font-bold font-serif mb-2 ml-12 mt-14">
          <h1 className="text-2xl ">ADD QUESTIONS </h1>
          <img src="./add.gif" alt="add icon" className="w-1/3 h-20 -mt-6" />
        </div>
        <form className="-mt-6">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Title{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Title"
            onChange={(event) => {
              setQuestion({ ...question, title: event.target.value });
            }}
          />
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Question{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Question"
            onChange={(event) =>
              setQuestion({ ...question, questions: event.target.value })
            }
          />
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Options
          </label>
          <div className="">
            {options?.map((x) => {
              return (
                <div key={x.id} className="flex  gap-1 ">
                  <input
                    className="w-1/2 block  bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                  w-1/2
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
                    // v-model="allowMultiple"
                    value={x.boolean}
                    onChange={(e) => {
                      handleType(x.id)(e);
                    }}
                  >
                    <option value="">Select the value</option>
                    <option value={true}>true</option>
                  </select>
                </div>
              );
            })}
          </div>
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Answer{" "}
          </label>
          <input
            className=" block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Answer"
            onChange={(event) =>
              setQuestion({ ...question, correctAnswer: event.target.value })
            }
          />
          <div className="flex">
            <button
              onClick={hundleSubmit}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
            >
              Add
            </button>
            <button
              onClick={handleUpload}
              className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  ml-36 "
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
