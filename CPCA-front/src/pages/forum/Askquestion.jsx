import Share from "../../icons/Share";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import newRequests from "../../utils/newRequest";
import { useSelector } from "react-redux";
import { useContext } from "react";
import SocketContext from "../../context/SocketContext";

const Askquestion = () => {
  const socket = useContext(SocketContext);
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
  console.log(user._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags } = e.target;
    const question = {
      question: title.value,
      description: description.value,
      tags: tags.value.split(","),
      userId: user._id,
    };

    console.log(question);

    const res = await newRequests.post(
      "/discussion/ask-question",
      question
    );
    if (res.status === 201) {
      socket.emit("send-question", {question, room: "discussion", user});
      toast.success("Question added successfully");
      navigate("/dashboard/forum/content");
    }
  };

  return (
    <div className="">
      <Toaster />
      <div
        className="flex flex-col items-center 
      gap-4 mb-12 border p-4 pb-6 rounded-md bg-purple-300 
      dark:bg-[#1E212A]  mt-12"
      >
        <h1
          className="text-2xl font-bold text-center
        text-purple-600 
        "
        >
          Ask a Question
        </h1>

        <form onSubmit={handleSubmit} className="form w-full ">
          <div className="title">
            <label className="text-gray-800 text-start dark:text-white">
              Question Title
            </label>
            <input
              name="title"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none
                shadow-sm"
              type="text"
            />
          </div>
          <div className="desc mt-3">
            <label className="text-gray-800 text-start dark:text-white">
              Question Description
            </label>
            <textarea
              name="description"
              className="mt-2 w-full h-24 px-3 py-2 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <div className="tages mt-3">
            <label className="text-gray-800 text-start dark:text-white">
              Related Tags
            </label>
            <input
              name="tags"
              placeholder="Enter tags seperated by comma"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-[230px] mx-auto flex items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 cursor-pointer"
          >
            <Share />
            <span className="text-white">Ask on Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Askquestion;
