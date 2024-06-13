import { useEffect, useState } from "react"
import { useCloseQuiz, useCompleteQuiz, useGetQuiz } from "./createCourse/hooks/quiz-hooks"
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"
import { Loading } from "./createCourse/components/loader"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { CheckIcon, LucideLoader2 } from "lucide-react"
import { showErrorToast } from "@/toasts/toast"
import { QuizError } from "./createCourse/error/editCourseError"
import { useDispatch, useSelector } from "react-redux"
import { ActionTypes } from "./createCourse/action.Types"
import { closeQuizDialog, openQuizDialog, showScoreDialog } from "@/features/course/quizSlice"
import { MdWarning } from "react-icons/md"
import { ScorePage } from "./quiz-score"

export const Quiz = () => {
  const params = useParams();
  const quizId = params.quizId;
  const { data, isSuccess, isError, error } = useGetQuiz(quizId)

  useEffect(() => {
    const handleBeforeUnload = (event) => event.returnValue = true;
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (isError) {
    return <QuizError message={error.response.data.error} status={error.response.status} />
  }

  return (
    <div className="flex flex-col gap-6  w-full min-h-screen h-full dark:bg-gray-600 dark:text-white bg-gray-100">
      {isSuccess ?<Question questions={data.data.questions} quizId={quizId} duration={data.data.duration}/> : <Loading />}
    </div>
  )
}


const Question = ({ questions,quizId,duration }) => {

  const user = useSelector(state => state.userState.user);
  const {classroom} = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prevAnswers => {
      // Find if the questionId already exists in selectedAnswers
      const answerIndex = prevAnswers.findIndex(answer => answer.questionId === questionId);
  
      if (answerIndex >= 0) {
        // If questionId exists, create a new array with updated answerId
        const updatedAnswers = [
          ...prevAnswers.slice(0, answerIndex), // before the updated answer
          { ...prevAnswers[answerIndex], answerId }, // updated answer
          ...prevAnswers.slice(answerIndex + 1), // after the updated answer
        ];
        return updatedAnswers;
      } else {
        // If questionId does not exist, add a new answer object
        return [
          ...prevAnswers,
          { questionId, answerId },
        ];
      }
    });
  };
 
  const handleNextQuestion = () => {
    if (currentPage < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isSelected = (questionId, optionId) => {
    const answer = selectedAnswers.find(answer => answer.questionId === questionId);
    return answer && answer.answerId === optionId;
  };

  const { mutateAsync: submitQuiz } = useCompleteQuiz(quizId);

  const onTimeUp = async() => {
    await submitQuiz({studentId:user._id,quizId,questions:selectedAnswers}).then(data => {
      console.log(data)
    });
  }

  return (
    <div className="grid grid-cols-2 xxs:grid-cols-1 md:grid-cols-2 p-4 w-full min-h-screen">
      <QuizDialog quizId={quizId} />
      <ScorePage />
      <div className="md:px-10 md:py-5 flex flex-col gap-6 md:border-r">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4">
            <span className="font-medium text-2xl">CPCA</span>
            <div className="xxs:flex gap-4 items-center md:hidden ">
                <Timer allocatedTime={duration*60} onTimeUp={onTimeUp} />
                <button onClick={() => dispatch(openQuizDialog({
                  label: 'Exit Quiz',
                  message: 'Are you sure you want to exit the quiz?',
                  actionType: 'CLOSE_QUIZ',
               }))} className="dark:bg-red-500 text-white px-4 py-1 text-sm rounded max-h-10 xss:block md:hidden">Exit</button>
            </div> 
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-md font-medium capitalize">Quiz Title</span>
              <span className="text-md font-thin">Question {currentPage} of {questions.length}</span>
            </div>
            <button onClick={() => dispatch(openQuizDialog({
              label: "submit quiz",actionType:ActionTypes.SUBMIT_QUIZ,
              message: "Are you sure you want to submit the quiz?",
              data: { classroomId: classroom._id,studentId: user._id,quizId,questions: selectedAnswers }}))} type="button" className={`bg-blue-500 max-w-sm  text-white px-4 py-2 text-sm rounded max-h-10 md:hidden ${currentPage === questions.length ? '':'hidden'}`}>
              Submit quiz
            </button>
          </div>
        </div>
        <div className="text-sm h-2/3">
          <FroalaEditorView model={questions[currentPage - 1]?.question} config={{}} /> 
        </div>
        <div className="md:flex w-full justify-center xxs:hidden ">
          <Pagination
            totalPages={questions.length}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div className=" h-full md:px-10 md:py-5 md:border-l">
        <div className="flex flex-col justify-between w-full h-full gap-8">
          <div className="flex justify-between items-center gap-4">
            <span>Select answer</span>
            <div className="md:flex gap-4 items-center xxs:hidden">
              <Timer allocatedTime={duration * 60} onTimeUp={() => console.log('time up')} />
               <button onClick={() => dispatch(openQuizDialog({
                  label: 'Exit Quiz',
                  message: 'Are you sure you want to exit the quiz?',
                  actionType: ActionTypes.CLOSE_QUIZ,
               }))} className="dark:bg-red-500 text-white px-4 py-1 text-sm rounded max-h-10 ">
                  Exit
                </button>
            </div>
          </div>
          <div className="flex flex-col gap-6 h-2/3 max-h-[400px] overflow-auto editor p-2">
            {questions[currentPage - 1]?.options.map((option, index) => (
              <button
                key={option._id}
                onClick={() => handleAnswerSelect(questions[currentPage - 1]._id, option._id)}
                className={`min-h-12 w-full border flex items-center justify-between gap-4 p-4 rounded ${
                  isSelected(questions[currentPage - 1]._id, option._id) ? 'border-blue-500 dark:border-blue-500 dark:text-white dark:bg-gray-600 bg-gray-100 text-black' : 'bg-white  text-black dark:bg-gray-600 dark:text-white border-gray-300'
                }`}
              >
                <span className="text-sm">{option.option}</span>
                <span className={`text-3xl font-bold text-gray-400 ${isSelected(questions[currentPage - 1]._id, option._id) ? 'dark:text-white text-blue-700':''}`}>{String.fromCharCode(65 + index)}</span>
              </button>
            ))}
          </div>
          <button onClick={() => dispatch(openQuizDialog({
              label: "submit quiz",actionType:ActionTypes.SUBMIT_QUIZ,
              message: "Are you sure you want to submit the quiz?",
              data: { classroomId: classroom._id,studentId: user._id,quizId,questions: selectedAnswers }}))} type="button" className={`bg-blue-500 max-w-sm  text-white px-4 py-2 text-sm rounded max-h-10 xxs:invisible  ${currentPage === questions.length ? 'md:visible':'invisible'}`}>
              Submit quiz
          </button>
          <div className="xxs:flex w-full justify-center md:hidden ">
            <Pagination
              totalPages={questions.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
        </div>

        </div>
      </div>
    </div>
  );
};


const QuizDialog = ({quizId}) => {
  const navigate = useNavigate();
  const { quizModal } = useSelector(state => state.quizState);
  const dispatch = useDispatch();

  const { label, message, actionType, data, open } = quizModal;
  const buttonTitle = actionType === 'CLOSE_QUIZ' ? 'Exit quiz' : 'Submit quiz';
  const { mutateAsync: submitQuiz, isSuccess, isPending,data:response } = useCompleteQuiz(quizId);
  const { mutateAsync: closeQuiz } = useCloseQuiz(quizId);

  const completeQuiz = async () => {
    try {
      switch (actionType) {
        case ActionTypes.CLOSE_QUIZ:
          await closeQuiz();
          dispatch(closeQuizDialog());
          break;
        case ActionTypes.SUBMIT_QUIZ:
          await submitQuiz(data).then(response => {
            dispatch(closeQuizDialog());
            dispatch(showScoreDialog({score:response.data.score,totalQuestions:response.data.totalScore }))
          })
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 ${open ? '' : 'hidden'}`}>
      <div className="absolute inset-0 w-screen h-screen bg-black/30" />
      <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-600 dark:text-white rounded-lg shadow-lg p-4 transform transition-transform duration-300 scale-100 sm:scale-105 md:scale-100">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="flex items-center gap-2 text-xl font-semibold capitalize">
            {actionType === 'CLOSE_QUIZ' ? <MdWarning size={24} className="text-red-500" /> : <CheckIcon className="w-6 h-6 text-green-500" />}
            {label}
          </span>
          <button onClick={() => dispatch(closeQuizDialog())} type="button" className="text-gray-100 hover:text-gray-200 hover:border-red-300 transition-colors border rounded-md p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-gray-700 dark:text-white">{message}</p>
        </div>
        <div className="flex justify-end gap-3 p-4  rounded-b-lg">
          <button onClick={completeQuiz} type="button" className="bg-blue-500 text-white px-4 py-1 text-sm rounded max-h-10 ">
            {isPending ? <LucideLoader2 className="w-6 h-6 animate-spin" /> : buttonTitle}
          </button>
          <button onClick={() => dispatch(closeQuizDialog())} type="button" className="dark:bg-gray-200 dark:text-black text-white px-4 py-1 text-sm rounded max-h-10 ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const handleClick = (page) => {
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    const maxPageNumbersToShow = 6;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1);
      let endPage = startPage + maxPageNumbersToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPageNumbersToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages.map(page => (
      <button
        key={page}
        onClick={() => handleClick(page)}
        className={`w-8 h-8 flex items-center justify-center rounded-full border ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'text-blue-500'}`}
      >
        &lt;
      </button>
      <div className="flex gap-2">
       { renderPageNumbers()}
      </div>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded-full border ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'text-blue-500'}`}
      >
        &gt;
      </button>
    </div>
  );
};

const Timer = ({ allocatedTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(allocatedTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="w-40">
      <span className="text-3xl font-medium">{formatTime(timeLeft)}</span>
    </div>
  );
};


