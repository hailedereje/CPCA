/* eslint-disable react/prop-types */
const CustomProgressBar = ({ value, max, color, height }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${height}`}>
      <div
        className={`h-full text-center text-white flex items-center justify-center ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      >
        {value}%
      </div>
    </div>
  );
};

CustomProgressBar.defaultProps = {
  color: 'bg-blue-500',
  height: 'h-6',
};

export default CustomProgressBar;
