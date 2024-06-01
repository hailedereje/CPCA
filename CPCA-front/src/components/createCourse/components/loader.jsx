import { FaSpinner } from 'react-icons/fa';

export const Loading = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
                <FaSpinner className="text-blue-500 text-4xl animate-spin" />
                <p className="text-gray-600 mt-4">Loading...</p>
            </div>
        </div>
    );
};
