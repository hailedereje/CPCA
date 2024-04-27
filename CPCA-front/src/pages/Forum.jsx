import UserInfo from "../components/UserInfo";
import Write from "../icons/Write";
import Send from "../icons/Send";
import { useQuery } from "react-query";
import newRequests from "../utils/newRequest";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import NothingHere from "../components/NothingHere";
import { useEffect, useState } from "react";
import LikeDislikeComponent from "../icons/LikeDislike";
import { useContext } from "react";
import SocketContext from "../context/SocketContext";
import { useSelector } from "react-redux";


const Forum = () => {
  const user = useSelector((state) => state.userState.user);
  const socket = useContext(SocketContext);
  const { topic } = useParams();
  const [openId, setOpenId] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  const { isLoading, data } = useQuery("getAllQuestions", async () => {
    if (topic) {
      console.log(topic);
      const res = await newRequests.get(`/discussion/find/${topic}`);
      return res.data;
    } else {
      const res = await newRequests.get("/discussion/questions");
      return res.data;
    }
  });

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  useEffect(() => {
    socket.emit("join-room", { room: "discussion", user });
    console.log("joined-user", user);

    socket.on('receive-question', ({ question, user, room }) => {
      console.log(`Received question from ${user._id} in room ${room}: ${JSON.stringify(question)}`);
      setQuestions((prevQuestions) => [...prevQuestions, question]);
    });
  },[socket, user]);


  if (isLoading) return <Loading />;

  return (
    <div
      className="flex flex-col items-center gap-y-5 
    md:gap-8 my-8 "
    >
      <Toaster />
      {questions.length > 0 &&
        questions.map((question, index) => {
          console.log("question", question);
          return (
            <div
              key={index}
              className="w-[96%] md:w-[80%] mx-12 flex flex-col 
              items-end  p-3 md:p-4 rounded-md bg-purple-100
               dark:bg-slate-400"
            >
              <div
                className="w-full bg-white dark:bg-[#1E212A]
              
              p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
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
                  <hr />
                  <UserInfo
                    openId={openId}
                    index={index + 1}
                    setOpenId={setOpenId}
                    question={question}
                  />
                </div>
              </div>
              {/* nested comment       */}
              {openId.find((ele) => ele === index + 1) && (
                <>
                  {question?.replies?.map((answer) => {
                    console.log("answer", answer);
                    return (
                      <div key={answer._id} className="flex items-center gap-4">
                        {/* fix this */}
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
                  {/* nested comment       */}
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
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      {data.length === 0 && <NothingHere />}
    </div>
  );
};

export default Forum;
