/* eslint-disable react/prop-types */
import { FaChalkboardTeacher, FaLaptop, FaDollarSign, FaCertificate } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="mb-8 py-20 bg-gray-200">
      <div className='flex flex-col justify-center items-center mb-8'>
        <h2 className="text-2xl font-bold">What We Provide For Our Students</h2>
        <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolore dicta eum tempore mollitia voluptate</p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureItem icon={<FaChalkboardTeacher />} title="Learn From Experts" description="Learn from industry experts with years of experience." />
        <FeatureItem icon={<FaLaptop />} title="Learn Anywhere" description="Access courses anytime, anywhere on any device." />
        <FeatureItem icon={<FaDollarSign />} title="Affordable Courses" description="Affordable courses with flexible payment options." />
        <FeatureItem icon={<FaCertificate />} title="Certifications" description="Earn certifications to boost your career." />
        <FeatureItem icon={<FaChalkboardTeacher />} title="Learn From Experts" description="Learn from industry experts with years of experience." />
        <FeatureItem icon={<FaLaptop />} title="Learn Anywhere" description="Access courses anytime, anywhere on any device." />
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 rounded">
      <div className="text-4xl text-blue-500 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Features;
