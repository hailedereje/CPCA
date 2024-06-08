import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import add from "../../assets/add.gif";
import newRequests from "@/utils/newRequest.js";

export const AddInstructorForm = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequests.post("/user/create-instructor", user);
      setUser({ email: "", password: "", username: "" });
      setPopupOpen(false);
    } catch (error) {
      console.log("Error adding instructor:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setUser({ email: "", password: "", username: "" });
    setPopupOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setPopupOpen(!isPopupOpen)}
      >
        <AiOutlinePlus className="h-6 w-6 mr-2" />
        Add Instructor
      </button>
      {isPopupOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex flex-col justify-center p-10">
                <span
                  className="btn btn-ghost btn-circle cursor-pointer absolute text-3xl top-0 right-0 text-red-500"
                  onClick={handleCancel}
                >
                  &times;
                </span>
                <div className="flex text-yellow-500 w-96 font-bold font-serif mb-2 ml-12">
                  <h1 className="text-2xl ">ADD INSTRUCTOR</h1>
                  <img src={add} alt="add icon" className="w-1/3 h-20 -mt-6" />
                </div>
                <form className="">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />

                  <label
                    htmlFor="password"
                    className="block mt-4 text-gray-700 text-sm font-semibold mb-2"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                      Submit
                    </button>
                    <button
                      type="submit"
                      onClick={handleCancel}
                      className="mt-6 bg-red-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInstructorForm;
