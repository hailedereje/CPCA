import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postQuizResult, postUserResult } from "../../Redux/action.js";
import { Link } from "react-router-dom";

export const Quiz = (props) => {
  const questionArr = props.questionArr;
  const data = useSelector((state) => state?.mernQuize?.QuizData);
  const userID = useSelector((state) => state?.mernQuize?.userId);
  const quizID = data[0]._id;
  // const allowdTime = useSelector((state) => state?.mernQuize?.allowdTime);
  const [timeLeft, setTimeLeft] = useState(60 * 90);
  const dispatch = useDispatch();

  const initialAns = questionArr.map(() => {
    return "Not Attempted";
  });
  const [num, setNum] = useState(0);
  const [ans, setAns] = useState(initialAns);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const handleSubmit = useCallback(() => {
    dispatch(postUserResult(ans));
    const obj = {
      quizId: quizID,
      userId: userID,
      quizResult: ans,
    };
    dispatch(postQuizResult(obj));
  }, [ans, dispatch, quizID, userID]);

  useEffect(() => {
    if (!timeLeft) {
      handleSubmit();
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [handleSubmit, timeLeft]);

  return (
    <div className=" w-11/12 h-96 pt-5 mt-16 bg-white">
      <div className="w-full shadow-lg  m-4 p-4 ml-12">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center text-xl font-bold absolute right-24 top-32 mb-8 ">
            <h1 className=" border-teal-500 rounded-2xl border-2 p-1 pl-2  pr-2">
              Attempted : {num + "/" + questionArr.length}
            </h1>
            <h1 className="border-teal-500 rounded-2xl border-2 p-1 pl-2  pr-2">
              Time left: {Math.floor(timeLeft / 3600)}:
              {(Math.floor(timeLeft / 60) % 60).toString().padStart(2, "0")}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className="flex-1 col-span-1">
            <h1 className="font-bold text-xl mb-4">Question Navigation</h1>
            <div className="grid grid-cols-4 gap-1">
              {questionArr.map((question, index) => (
                <button
                  key={index}
                  className={
                    num === index
                      ? "bg-blue-500 text-white font-bold p-2 rounded"
                      : ans[index] === "Not Attempted"
                      ? "border-2 border-red-500 font-bold p-2 rounded"
                      : "border-2 border-blue-500 font-bold p-2 rounded"
                  }
                  onClick={() => {
                    setNum(index);
                    if (index === 0) {
                      setShowPrevBtn(false);
                    } else {
                      setShowPrevBtn(true);
                    }
                    if (questionArr.length - 1 === index) {
                      setShowSubmitBtn(true);
                    } else {
                      setShowSubmitBtn(false);
                    }
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <Link to="/showallanswer">
              {" "}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1 my-4"
                onClick={handleSubmit}
              >
                Finish Attempt
              </button>
            </Link>
          </div>
          <div className="flex-1 col-span-2">
            <div className="flex">
              <h1 className="text-2xl m-2 text-black-400/25">{num + 1})</h1>
              <h1 className="text-2xl m-2 text-black-400/25">
                {questionArr[num]?.questions}
              </h1>
            </div>
            <ol className="">
              {questionArr[num]?.options?.map((answer, index) => (
                <li
                  key={index}
                  className={
                    ans.length > num && ans[num] === answer.option
                      ? "bg-yellow-200 border border-gray-300 text-center cursor-pointer m-2 p-2 rounded-lg"
                      : "bg-white border border-gray-300 text-center cursor-pointer m-2 p-2 rounded-lg"
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
            <div className="mt-3 flex justify-left gap-2">
              {showPrevBtn ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                  onClick={() => {
                    if (num === 1) {
                      setShowPrevBtn(false);
                    }
                    if (questionArr.length - 2 < num) {
                      setShowSubmitBtn(false);
                    }
                    setNum(num - 1);
                  }}
                >
                  Previous
                </button>
              ) : (
                ""
              )}
              {showSubmitBtn ? (
                <Link to="/showallanswer">
                  {" "}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                    onClick={handleSubmit}
                  >
                    Finish Attempt
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1"
                  onClick={() => {
                    setNum(num + 1);
                    setShowPrevBtn(true);
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
      </div>
    </div>
  );
};
