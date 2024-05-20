import { Loading } from '@/components';
import newRequests from '@/utils/newRequest';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const QuestionsList = () => {

  const {isLoading, data} = useQuery('practice_questions', async () => {
    try {
        await newRequests.get('/practice_questions');
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
      <ul className="list-disc list-inside">
        {data.map((question) => (
          <li key={question.id} className="mb-2">
            <Link to={`/practice_question/${question.id}`} className="text-blue-500 hover:underline">
              {question.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
