// import { useDispatch } from 'react-redux';
// import { addReview } from '../features/courses/courseSlice';

import { useState } from "react";

const ReviewForm = () => {
//   const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addReview({ id: Date.now(), name, rating: 5, feedback: comment }));
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Your Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Your Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Your Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border rounded" required></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Review</button>
      </form>
    </section>
  );
};

export default ReviewForm;
