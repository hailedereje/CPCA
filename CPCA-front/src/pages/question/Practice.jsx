import { useParams } from "react-router-dom";
import newRequests from "@/utils/newRequest";
import { Loading } from "@/components";
import { CodeEditor } from "@/components/CodeEditor";
import { useEffect, useState } from "react";

const PracticeQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await newRequests.get(`/practice_question/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-start">
      <div className="p-20 h-auto w-full">
        <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
        <p className="mb-4">{question.description}</p>
        <div className="mb-4">
          <strong>Difficulty:</strong> {question.difficulty}
        </div>
        <div className="mb-4">
          <strong>Constraints:</strong>
          <pre className="bg-gray-100 p-2 rounded">{question.constraints}</pre>
        </div>
        <div className="mb-4">
          <strong>Sample Input:</strong>
          <pre className="bg-gray-100 p-2 rounded">{question.sampleInput}</pre>
        </div>
        <div className="mb-4">
          <strong>Sample Output:</strong>
          <pre className="bg-gray-100 p-2 rounded">{question.sampleOutput}</pre>
        </div>
        <div className="mb-4">
          <strong>Examples:</strong>
          <pre className="bg-gray-100 p-2 rounded">{question.examples}</pre>
        </div>
      </div>
      <CodeEditor />
    </div>
  );
};

export default PracticeQuestionPage;
