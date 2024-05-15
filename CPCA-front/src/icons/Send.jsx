// import { useMutation, useQueryClient } from "react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequests from "../utils/newRequest";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Send = ({ answer, questionId, setAnswer }) => {
  const user = useSelector((state) => state.userState.user)
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault()
    mutation.mutate(questionId);
  };

  const mutation = useMutation({
    mutationKey: ["new-answer"],
    mutationFn: (id) => {
      return newRequests.post(
        `/discussion/answer/${id}`,
        {
          answer,
          userId: user._id,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllQuestions"]);
      setAnswer("");
    },
  });

  return (
    <svg
      onClick={handleSubmit}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-purple-700 cursor-pointer hover:scale-110 hover:translate-x-1 hover:transform transition-all duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
};

export default Send;
