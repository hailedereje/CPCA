/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import UserInfo from "../../components/forum/UserInfo";
import { useQuery } from "react-query";
import newRequests from "../../utils/newRequest";
import Loading from "../../components/Loading";
import NothingHere from "../../components/NothingHere";
import { useContext, useState } from "react";
import LikeDislikeComponent from "../../icons/LikeDislike";
import DiscussionContext from "@/context/DiscussionContext";
import Write from "@/icons/Write";
import Send from "@/icons/Send";

const Content = () => {
  const [openId, setOpenId] = useState([]);
  const {socket, classroomId} = useContext(DiscussionContext);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  const { isLoading, data } = useQuery("getMyQuestions", () =>
    newRequests
      .get(`/classroom/discussion/my-questions/${classroomId}`)
      .then((res) => setQuestions(res.data.discussion))
  );
  if (isLoading) return <Loading />;

  const handleAnswerAdded = async () => {
    const res = await newRequests.get(`/classroom/discussion/my-questions/${classroomId}`);
    if(res.data){
      setQuestions(res.data.discussion);
    }
  }

  return (
    <div
    className="flex flex-col items-center bg-slate-100 w-1/2 h-[82vh] overflow-y-auto"
    >
      {questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-end p-2 md:p-4 w-full" 
          >
              <div
                className="w-full bg-white dark:bg-[#1E212A] p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
              >
                <div className="left-section space-y-1 text-center">
                  <LikeDislikeComponent question={question} />
                </div>
                <div className="right-section w-full">
                  <h1 className="text-base md:text-lg dark:text-white">
                    {question?.question}
                  </h1>
                  <p className="text-sm md:text-base">
                    {question?.description}
                  </p>
                  <hr className="my-2"/>
                  <UserInfo
                    openId={openId}
                    index={index + 1}
                    setOpenId={setOpenId}
                    question={question}
                  />
                </div>
              </div>
              {openId.find((ele) => ele === index + 1) && (
                <>
                  {question?.replies?.map((answer) => {
                    return (
                      <div key={answer._id} className="flex items-center gap-4">
                        <img
                          className="h-4 md:h-6 w-4 md:w-6"
                          src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                          alt=""
                        />
                        <div className="bg-white dark:bg-[#32353F] dark:text-white max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2">
                          <p className="text-inherit">{answer?.reply}</p>
                          <UserInfo answer={answer} />
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="w-full bg-white dark:bg-slate-900 flex items-center gap-4
       px-5 py-2 rounded-lg shadow-md  mt-2"
                  >
                    <Write />
                    <input
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full h-10 border-none outline-none rounded-md py-1 px-2 "
                      type="text"
                      value={answer}
                      placeholder="Write a comment"
                    />
                    <Send
                      questionId={question._id}
                      answer={answer}
                      setAnswer={setAnswer}
                      onAnswerAdded={handleAnswerAdded}
                    />
                  </div>
                </>
              )}
            </div>
          );
          <hr />
        })}
      {questions.length === 0 && <NothingHere />}
    </div>
  );
};

export default Content;
