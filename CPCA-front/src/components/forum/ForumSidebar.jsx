import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const active =
    "  bg-purple-100 text-purple-500 px-4 py-2 rounded-sm border-l-4 border-purple-700";
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } md:block  w-[60%] md:w-[15%] h-full md:h-80 fixed left-0 md:left-28 z-10 top-14 md:top-24 list-none
    text-gray-300 text-sm space-y-4 py-8 md:py-0
     bg-white dark:bg-[#1E212A] md:dark:bg-inherit shadow-md 
     md:shadow-none md:bg-transparent
    `}
    >
      <li
        onClick={() => navigate("content")}
        className={
          "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 hover:cursor-pointer " +
          (location === "/forum/content" ? active : " ")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        HOME
      </li>
      <li
        onClick={() => navigate("myqns")}
        className={
          "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer " +
          (location === "/forum/myqns" ? active : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        MY QNA
      </li>
    </div>
  );
};

export default Sidebar;
