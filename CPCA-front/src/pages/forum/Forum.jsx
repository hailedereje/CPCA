/* eslint-disable react/prop-types */
import UserInfo from "../../components/forum/UserInfo";
import Write from "../../icons/Write";
import Send from "../../icons/Send";
import newRequests from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import NothingHere from "../../components/NothingHere";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import DiscussionContext from "@/context/DiscussionContext";

const Forum = () => {
  const user = useSelector((state) => state.userState.user);
  const { socket, classroomId } = useContext(DiscussionContext);
  const dispatch = useDispatch();
  const { topic } = useParams();
  const [openId, setOpenId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  const { isLoading, data } = useQuery("getDiscussionByClassroomId", async () => {
    if (topic) {
      const res = await newRequests.get(`/discussion/find/${topic}`);
      return res.data;
    } else {
      const res = await newRequests.get(`/classroom/discussion/${classroomId}`);
      return res.data;
    }
  });

  const handleAnswerAdded = async (questionId, newAnswer) => {
    const updatedQuestions = questions.map((q) => {
      if (q._id === questionId) {
        return {
          ...q,
          replies: [...q.replies, newAnswer],
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    if (data && data.discussion) {
      setQuestions(data.discussion);
    }
  }, [data]);

  useEffect(() => {
    const handleReceiveQuestion = async ({ question }) => {
      setQuestions((prevQuestions) => [question, ...prevQuestions]);
    };
    if (socket) {
      socket.on('receive-question', handleReceiveQuestion);

      return () => {
        socket.off('receive-question', handleReceiveQuestion);
      };
    }
  }, [user, dispatch, socket]);

  useEffect(() => {
    const handleReceiveAnswer = async ({ questionId, newAnswer }) => {
      const updatedQuestions = questions.map((q) => {
        if (q._id === questionId) {
          return {
            ...q,
            replies: [...q.replies, newAnswer],
          };
        }
        return q;
      });
      setQuestions(updatedQuestions);
    };
    if (socket) {
      socket.on('receive-answer', handleReceiveAnswer);

      return () => {
        socket.off('receive-answer', handleReceiveAnswer);
      };
    }
  }, [user, dispatch, socket]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl h-screen overflow-y-auto bg-slate-100">
      <Toaster />
      {questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-end p-3 md:p-4 border-b border-gray-200 w-full"
            >
              <div className="w-full bg-white p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5">
                <div className="right-section w-full">
                  <h1 className="text-lg font-semibold text-gray-800">{question?.question}</h1>
                  <p className="text-base text-gray-600">{question?.description}</p>
                  <hr className="my-2" />
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
                      <div key={answer._id} className="flex items-center gap-4 mt-2">
                        <img
                          className="h-4 md:h-6 w-4 md:w-6"
                          src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                          alt=""
                        />
                        <div className="bg-white max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5">
                          <p className="text-gray-800">{answer?.reply}</p>
                          <UserInfo answer={answer} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="w-full bg-white flex items-center gap-4 px-5 py-2 rounded-lg shadow-md mt-2">
                    <Write />
                    <input
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md py-1 px-2 outline-none"
                      type="text"
                      value={answer}
                      placeholder="Write a comment"
                    />
                    <Send
                      socket={socket}
                      classroomId={classroomId}
                      author={user}
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
        })}
      {questions.length === 0 && <NothingHere />}
    </div>
  );
};

export default Forum;
