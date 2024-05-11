import { api } from '@/api';
import { store } from '@/store';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateQuiz = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');

    const handleCreateQuiz = async (event) => {
        event.preventDefault();
        if(quizTitle){
          try {
            const result = await store
            .dispatch(api.endpoints.createQuiz.initiate(quizTitle))
            .unwrap();
            console.log(result);
            if (result) {
              toast.success("Quiz Created successfully");
              return redirect("/");
            }
          } catch (err) {
            console.log(err);
            const errorMessage =
              err?.data?.msg || "Server Error. Please try again later.";
            toast.error(errorMessage);
          }
        } else {
          alert("Please enter the title first");
        }
      };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <div>
            <button onClick={() => setShowDialog(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Quiz
            </button>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <input
                            type="text"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder="Enter quiz title"
                            className="border border-gray-300 rounded px-4 py-2 mb-4"
                        />

                        <div className="flex justify-end">
                            <button onClick={handleCreateQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Create
                            </button>
                            <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateQuiz;