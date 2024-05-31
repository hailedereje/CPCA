import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import newRequests from "@/utils/newRequest";

const JoinClass = () => {
  const [email, setEmail] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const classroomId = params.get("classroomId");
    if (email) setEmail(email);
    if (classroomId) setClassroomId(classroomId);
  }, [location]);

  const handleJoinClass = async () => {
    try {
      await newRequests.post("/enroll", { email, classroomId });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Join Class</h1>
      <p className="mb-2">Email: {email}</p>
      <p className="mb-4">Classroom ID: {classroomId}</p>
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
