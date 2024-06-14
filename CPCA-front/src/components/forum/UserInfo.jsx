/* eslint-disable react/prop-types */
import newRequests from "@/utils/newRequest";
import Comment from "../../icons/Comment";
import moment from "moment";
import {useSelector} from 'react-redux'
import { useEffect } from "react";

const UserInfo = ({ openId, index, setOpenId, question, answer, currentUserEmail }) => {
  const currentUser = useSelector((state) => state.userState.user);
  useEffect(() => {
    const seenRequest = async () => {
      await newRequests.post(`/discussion/seen-reply/${answer._id}`)
    }
    if (answer && currentUserEmail === currentUser.email && !answer.seen){
      console.log("it has entered the function")
      seenRequest();
    }
  })
  return (
    <div className="w-full  flex items-center justify-between">
      <div className="w-[48%] md:max-w-screen-md posted-by flex items-center gap-2 md:gap-3">
        <img
          src={
            question?.author?.profileImg ||
            answer?.author?.profileImg ||
            "https://avatars.githubusercontent.com/u/56132780?v=4"
          }
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
        <h2 className="text-gray-300 text-xs">
          {answer ? "answered by\n" : "posted by "}{" "}
          <span className="text-black font-bold  md:text-sm">
            {question
              ? question?.author?.username === currentUser?.username
                ? question?.author?.username + " (You)"
                : question?.author?.username
              : answer
              ? answer?.author?.username === currentUser?.username
                ? answer?.author?.username + " (You)"
                : answer?.author?.username
              : ""}
          </span>
        </h2>
      </div>
      <div className="posted-on mx-auto">
        <h2 className="text-gray-300 text-xs">
          {question
            ? moment(question?.createdAt).fromNow()
            : moment(answer?.createdAt).fromNow()}
        </h2>
      </div>
      {openId && (
        <div
          className="comment flex gap-1 ml-auto p-1 cursor-pointer"
          onClick={async () => {
            if (!openId.find((ele) => ele === index)) {
              setOpenId([...openId, index]);
            }
            if (openId.find((ele) => ele === index)) {
              setOpenId(openId.filter((ele) => ele !== index));
            }
          }}
        >
          <Comment />
          <span className="text-gray-300 text-xs">
            {question?.replies?.length || "No replies"}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
