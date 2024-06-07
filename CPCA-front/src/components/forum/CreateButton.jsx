import Add from "../../icons/Add";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("ask")}
<<<<<<< HEAD
      className="flex items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 cursor-pointer"
=======
      className="flex items-center gap-2 bg-blue-700 rounded-md shadow-sm px-8 py-2 cursor-pointer"
>>>>>>> 8645c6294ef58657dad18d349819bef862f6450d
    >
      <Add />
      <span className="text-white">Start a New Topic</span>
    </div>
  );
};

export default CreateButton;
