const Mark = ({ completed }) => {
  return (
    <div>
      <svg
        className={`mr-2 ${completed ? 'text-green-500' : 'text-gray-500'}`}
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M280.768 753.728L691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64z"
        ></path>
      </svg>
    </div>
  );
};

export default Mark;