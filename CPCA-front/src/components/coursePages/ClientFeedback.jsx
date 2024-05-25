// import { useSelector } from 'react-redux';
// import { selectReviews } from '../features/courses/courseSlice';

const ClientFeedback = () => {
//   const reviews = useSelector(selectReviews);
    const reviews = [
        { id: 1, name: 'Cindy Monahan', rating: 4.5, feedback: 'Great course, learned a lot!' },
        { id: 2, name: 'Tiffany Corley', rating: 4.0, feedback: 'Very informative and well-structured.' },
    ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Client Feedback</h2>
      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold">4.45</div>
        <div className="ml-4">
          <div className="text-gray-600">Average Rating</div>
          <div className="text-gray-400">Based on 120 reviews</div>
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border p-4 rounded shadow">
            <div className="flex items-center mb-2">
              <div className="text-xl font-bold">{review.name}</div>
              <div className="ml-4 text-yellow-500">
                {'★'.repeat(Math.floor(review.rating))}{'☆'.repeat(5 - Math.floor(review.rating))}
              </div>
            </div>
            <p className="text-gray-600">{review.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientFeedback;
