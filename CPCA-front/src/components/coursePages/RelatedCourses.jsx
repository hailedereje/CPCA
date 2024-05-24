import { useRef } from 'react';
import CourseItem from './CourseCard';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';

const CourseList = () => {
//   const courses = useSelector(selectCourses);
const courses = [
    {
      id: 1,
      title: 'Introduction to HTML',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      instructor: 'John Doe',
      image: 'https://via.placeholder.com/300',
      profileImage: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Introduction to CSS, SASS, and Bootstrap',
      description: 'Learn the basics of CSS, SASS, and Bootstrap with best practices',
      instructor: 'Jane Doe',
      image: 'https://via.placeholder.com/300',
      profileImage: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript, ES6, and TypeScript',
      instructor: 'John Doe',
      image: 'https://via.placeholder.com/300',
      profileImage: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Introduction to React',
      description: 'Learn the basics of React and React-Redux with best practices',
      instructor: 'Jane Doe',
      image: 'https://via.placeholder.com/300',
      profileImage: 'https://via.placeholder.com/150',
    },
];
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 336, behavior: 'smooth' });
    }
  };
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -336, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-20 mt-8 relative container mx-auto">
      <h2 className="text-2xl font-bold my-4">Related Courses</h2>
      <div
        className="flex space-x-4 overflow-x-scroll pb-4"
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <CourseItem course={course} />
          </div>
        ))}
      </div>
      <div className='flex items-center absolute right-0 -bottom-12 space-x-2'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleScrollRight}
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleScrollLeft}
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default CourseList;
