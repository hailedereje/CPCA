import { useRef } from "react";
import CustomProgressBar from "../progress/ProgressBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const ContinueLearning = () => {
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
      scrollContainerRef.current.scrollBy({ left: 510, behavior: 'smooth' });
    }
  };
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -510, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-20 container mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
      <div className="flex flex-row overflow-x-scroll space-x-4"
      ref={scrollContainerRef}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {courses.map((course, index) => (
            <div key={index} className="flex-shrink-0 w-1/2">
                <div className=" border rounded-lg shadow p-4 flex items-center gap-10">
                <img src={course.image} alt="Continue Learning" className="w-48 h-48 object-cover mb-2 rounded-lg" />
                <div className="flex flex-col gap-5">
                    <div className="">
                        <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                        <span className="text-gray-600 mb-2">{course.instructor}</span>
                    </div>
                    <div className="flex-1 items-start">
                        <CustomProgressBar value={50} max={100} color="bg-blue-500" height="h-4" />
                        <button className="px-3 py-2 rounded-lg bg-blue-500 text-white text-xl mt-2">Continue Learning</button>
                    </div>
                </div>
          </div>
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
    </div>
  );
};

export default ContinueLearning;
