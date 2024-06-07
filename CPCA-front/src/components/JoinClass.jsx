import { useNavigate, useParams } from "react-router-dom";
import newRequests from "@/utils/newRequest";
import { useEffect, useState } from "react";

const JoinClass = () => {
  const {token} = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await newRequests.get(`/classroom/invitation/${token}`);
      if(response.data.msg === "Invalid invitaion link") {
        alert("Invalid invitation link")
        return navigate("/login")
      }
      setData(response.data);
    }
    fetchData();
  }, [token, navigate]);

  const handleJoinClass = async () => {
    try {
      await newRequests.get(`/classroom/join/${token}`);
      await newRequests.put("/classroom/invitation/accept", { token });
      navigate("/login")
    } catch (error) {
      console.error("error", error.response.data.message);
      if(error.response.data.msg === "User not found") {
        navigate(`/register/${token}`)
      }
      else if(error.response.data.msg === "already enrolled") {
        alert("You are already enrolled in this classroom")
      } else if (error.response.data.msg === "Invalid invitaion link"){
        alert("Invalid invitation link")
      } else if (error.response.data.msg === ("Classroom not found")) {
        alert("Classroom not found")
      } else {
        alert("Something went wrong, please try again")
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="p-4 flex flex-col text-center w-96 border border-gray-300 rounded-t-lg pb-10 shadow-lg hover:shadow-xl">
        <h1 className="text-2xl font-bold mb-5">Join Classroom</h1>
        <p className="">Hey <span className="font-bold">{data.username}</span>, you are invited to join <span className="font-bold text-lg">{data.classroomName}</span> class</p>
        <p>by Instructor <span className="font-bold text-lg">{data.instructor}</span></p>
      </div>
      <button
        className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-t-none"
        onClick={handleJoinClass}
      >
        Join Class
      </button>
    </div>
  );
};

export default JoinClass;
