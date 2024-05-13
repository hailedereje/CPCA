import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postQuizResult, postUserResult } from "../../Redux/action.js";
import { Link } from "react-router-dom";

export const Quiz = (props) => {
  const questionArr = props.questionArr;
  const data = useSelector((state) => state?.mernQuize?.QuizData);
  const userID = useSelector((state) => state?.mernQuize?.userId);
  const quizID = data[0]._id;
  const dispatch = useDispatch();

  const [num, setNum] = useState(0);
  const [ans, setAns] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [showPrevBtn, setShowPrevBtn] = useState(false);

  return (
    <div className=" w-11/12 h-96 pt-5 mt-16 bg-white">
      <div className="w-full shadow-lg  m-4 p-4 ml-12">
        <div className="flex justify-between align-middle">
          <div className="w-24  h-16">
            <iframe src="https://embed.lottiefiles.com/animation/103649" title="Animation"></iframe>
          </div>
          <div className="flex w-4/5 pl-24 ml-12">
            <h1 className="text-2xl m-2 text-black-400/25">{num + 1})</h1>
            <h1 className="text-2xl m-2 text-black-400/25">
              {questionArr[num]?.questions}
            </h1>
          </div>
          <div className="border-teal-500 rounded-2xl absolute  right-24 top-32 border-2 mb-8 p-1 pl-2  pr-2 ">
            <h1 className="text-xl font-bold">
              Attempted : {num + "/" + questionArr.length}
            </h1>
          </div>
        </div>
        <ol className=" w-3/5 ml-64">
          {questionArr[num]?.options?.map((answer, index) => (
            <li
              key={index}
              className={
                ans.length > num && ans[num] === answer.option
                  ? "bg-yellow-200 border border-gray-300 text-center cursor-pointer m-2 p-2 rounded-lg"
                  : `bg-white border border-gray-300 text-center cursor-pointer m-2 p-2 rounded-lg`
              }
              onClick={(e) => {
                const newArray = [...ans];
                newArray[num] = answer.option;
                setAns(newArray);
              }}
            >
              {answer.option}
            </li>
          ))}
        </ol>
        <div className="mt-3 ml-80 pl-48">
          {showPrevBtn ? (
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
            onClick={() => {
              if (num === 1){
                setShowPrevBtn(false)
              }
              if (questionArr.length - 2 < num) {
                setShowSubmitBtn(false);
              }
              setNum(num - 1);
            }}
          >
            Previous
          </button>
          ) : ""}
          {showSubmitBtn ? (
            <Link to="/showaresult">
              {" "}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                onClick={() => {
                  dispatch(postUserResult(ans));
                  const obj = {
                    quizId: quizID,
                    userId: userID,
                    quizResult: ans,
                  };
                  dispatch(postQuizResult(obj));
                }}
              >
                Submit
              </button>
            </Link>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
              onClick={() => {
                setNum(num + 1);
                setShowPrevBtn(true)
                if (questionArr.length - 2 === num) {
                  setShowSubmitBtn(true);
                }
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
