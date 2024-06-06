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

const Content = () => {
  const [openId, setOpenId] = useState([]);
  const {socket, classroomId} = useContext(DiscussionContext);

  const { isLoading, data } = useQuery("getMyQuestions", () =>
    newRequests
      .get(`/classroom/discussion/my-questions/${classroomId}`)
      .then((res) => res.data)
  );
  if (isLoading) return <Loading />;

  return (
    <div
    className="flex flex-col items-center bg-slate-100 w-1/2"
    >
      {data?.discussion.length > 0 &&
        data.discussion.map((question, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-end p-2 md:p-4 border-b border-gray-200" 
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
                  <hr />
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
                    console.log("answer", answer);
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
                </>
              )}
            </div>
          );
        })}
      {data?.discussion.length === 0 && <NothingHere />}
    </div>
  );
};

export default Content;
