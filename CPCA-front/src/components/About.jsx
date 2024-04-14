import React from "react";
import Testimonials from "./Testimonials";

const About = () => {
  const stats = [
    {
      id: "stats-1",
      title: "User Active",
      value: "3800+",
    },
    {
      id: "stats-2",
      title: "Trusted by Company",
      value: "230+",
    },
    {
      id: "stats-3",
      title: "Transaction",
      value: "$230M+",
    },
  ];

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center w-full md:w-3/4 space-y-6 md:space-y-0 md:space-x-20 ml-auto mr-auto mt-20 ">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-green-2 shadow-lg rounded-lg p-2 flex-1 w-2/3  sm:p-4 md:w-1/4"
          >
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-4xl font-bold text-blue-1">{stat.value}</h4>
              <div className="bg-blue-1 text-white px-3  rounded-full text-xs font-semibold mt-2">
                {stat.title}
              </div>
              <p className="text-gray-600 text-lg font-medium mt-4">
                {stat.title.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </section>
      <Testimonials></Testimonials>
    </>
  );
};

export default About;
