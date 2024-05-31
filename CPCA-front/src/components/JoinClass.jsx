import { useNavigate, useParams } from "react-router-dom";
import newRequests from "@/utils/newRequest";

const JoinClass = () => {
  const {token} = useParams();
  const navigate = useNavigate();

  const handleJoinClass = async () => {
    try {
      await newRequests.get(`/classroom/join/${token}`);
      navigate("/login")
    } catch (error) {
      console.error("error", error.response.data.message);
      if(error.response.data.message === "User not found") {
        navigate(`/register/${token}`)
      }
      if(error.response.data.message === "User already enrolled in this classroom") {
        alert("You are already enrolled in this classroom")
      } else if (error.response.data.message === "Invalid invitaion link"){
        alert("Invalid invitation link")
      } else if (error.response.data.message === ("Classroom not found")) {
        alert("Classroom not found")
      } else {
        alert("Something went wrong, please try again")
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleJoinClass}
      >
        Join Class
      </button>
    </div>
  );
};

export default JoinClass;
