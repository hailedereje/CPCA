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
import LikeDislikeComponent from "../../icons/LikeDislike";
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
      setQuestions((prevQuestions) => [...prevQuestions, question]);
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
    <div className="flex flex-col items-center w-full bg-slate-100 dark:bg-slate-800 h-screen overflow-y-auto p-4">
      <Toaster />
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="flex flex-col items-end w-full mb-6">
            <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="flex items-start gap-4">
                <div className="left-section text-center">
                  <LikeDislikeComponent question={question} />
                </div>
                <div className="right-section w-full">
                  <h1 className="text-lg font-bold dark:text-white">{question?.question}</h1>
                  <p className="text-gray-700 dark:text-gray-300">{question?.description}</p>
                  <hr className="my-2" />
                  <UserInfo openId={openId} index={index + 1} setOpenId={setOpenId} question={question} />
                </div>
              </div>
            </div>
            {openId.includes(index + 1) && (
              <div className="w-full mt-4">
                {question?.replies?.map((answer) => (
                  <div key={answer._id} className="flex items-start gap-4 mb-4">
                    <img
                      className="h-6 w-6"
                      src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                      alt=""
                    />
                    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow-md w-full">
                      <p>{answer?.reply}</p>
                      <UserInfo answer={answer} />
                    </div>
                  </div>
                ))}
                <div className="w-full bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mt-4 flex items-center gap-4">
                  <Write />
                  <input
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full h-10 border-none outline-none rounded-md py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
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
              </div>
            )}
          </div>
        ))
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

export default Forum;
