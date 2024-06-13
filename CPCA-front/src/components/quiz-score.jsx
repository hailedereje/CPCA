import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaCheckCircle, FaHome, FaRedo } from 'react-icons/fa';
import { closeScoreDialog } from '@/features/course/quizSlice';

export const ScorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {score, totalQuestions,showScore} = useSelector(state => state.quizState.quizModal);
  const handleRetakeQuiz = () => {
    dispatch(closeScoreDialog())
    navigate(-1); 
  };

  const handleGoHome = () => {
    dispatch(closeScoreDialog())
    navigate(-2);
  };
  console.log(score,totalQuestions)
  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 75) return 'Great job!';
    if (percentage >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <div className={`fixed inset-0 w-full h-full flex items-center justify-center min-h-screen bg-black/30 p-4 ${showScore ? '':'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
          <button onClick={() => {
            dispatch(closeScoreDialog())
            navigate(-1) 
          }}
            type="button" className="absolute top-4 right-5 text-red-500 hover:text-red-400 hover:border-red-300 transition-colors border rounded-md p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        <div className="text-center mb-6">
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-800 mt-4">Quiz Completed!</h1>
          <p className="text-xl text-gray-600 mt-2">{getScoreMessage()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-2xl font-medium text-gray-800">
              <FaCheckCircle className="w-8 h-8 text-blue-500" />
              <span>Your Score :</span>
            </div>
            <span className="text-3xl font-bold text-blue-600">{score}</span>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <span>Percentage: {(score / totalQuestions * 100).toFixed(2)}%</span>
          </div>
        </div>
        <div className="text-center space-y-4">
          <button
            onClick={handleRetakeQuiz}
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
          >
            <FaBook className="mr-2" /> Proceed to a course
          </button>
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors w-full"
          >
            <FaHome className="mr-2" /> Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

