import Comment from "../icons/Comment";
import moment from "moment";
import {useSelector} from 'react-redux'

const UserInfo = ({ openId, index, setOpenId, question, answer }) => {
  const currentUser = useSelector((state) => state.userState.user);
  return (
    <div className="w-full  flex items-cente justify-between">
      <div className="w-[48%] md:max-w-screen-md posted-by flex items-center gap-2 md:gap-3">
        <img
          src={
            question?.author?.profileImage ||
            answer?.author?.profileImage ||
            "https://avatars.githubusercontent.com/u/56132780?v=4"
          }
          alt="profile"
          className="h-5 md:w-6 w-5 md:h-6 rounded-full"
        />
        <h2 className="text-gray-300 text-xs">
          {answer ? "answered by\n" : "posted by "}{" "}
          <span className="text-purple-800 font-bold  md:text-sm">
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
          className="comment flex gap-2 ml-auto cursor-pointer"
          onClick={() => {
            if (!openId.find((ele) => ele === index)) {
              console.log("hello");
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
