import { useState } from 'react';

const tabs = ['All Courses', 'Popular', 'Newest', 'Top Rated'];

const CourseTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="mb-8">
      <div className="flex justify-center space-x-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 ${activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-b-0 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseTabs;
