import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import newRequests from "../../utils/newRequest";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { FiSend } from "react-icons/fi";
import DiscussionQuestion from "../../context/DiscussionContext";

const Askquestion = () => {
  const { socket, classroomId } = useContext(DiscussionQuestion);
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags } = e.target;
    const question = {
      classroomId,
      title: title.value,
      description: description.value,
      tags: tags.value.split(","),
    };

    try {
      const res = await newRequests.post("/discussion/ask-question", question);
      if (res.status === 201) {
        if (socket) {
          socket.emit("send-question", { question: res.data, roomId: classroomId });
        }
        toast.success("Question added successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Failed to add question. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
      <Toaster />
      <h1 className="text-3xl font-bold text-center mb-6">Start a New Topic</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">Question Title</label>
          <input
            name="title"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Question Description</label>
          <textarea
            name="description"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">Related Tags</label>
          <input
            name="tags"
            placeholder="Enter tags separated by commas"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          <FiSend />
          <span>Ask on Community</span>
        </button>
      </form>
    </div>
  );
};

export default Askquestion;
