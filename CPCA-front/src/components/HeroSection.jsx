import React, { useState, useEffect } from "react";
import HeroImage from "../assets/hero.svg";
import GetStarted from "./GetStarted";

function HeroSection() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const courses = ["Python", "C++", "JAva"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % courses.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 pb-0 sm:grid-cols-2 p-10 h-screen">
        <div className="flex flex-col justify-center gap-y-3 text-medium text-5xl pl-5 sm:items-center">
          <h1 className="text-left pb-5">
            <span className="text-green-1 font-bold font-sans sm:text-6xl text-center">
              Free Online Courses On{" "}
              <span className=" text-green-2 animate-pulse ">
                "{courses[currentCourseIndex]}"
              </span>
            </span>
          </h1>
          <p className="leading-relaxed text-base font-mono font-medium sm:text-2xl">
            Discover the power of programming with our expert-guided courses.
            From beginners to advanced learners, we're here to help you succeed.
            Start your coding journey today!
          </p>
        </div>

        <div className="sm:hidden">
          <img
            src={HeroImage}
            alt="hero Image"
            className="text-primary w-3/4 h-auto mx-auto animate-bounce"
          />
        </div>
        <div className="hidden sm:block">
          <img
            src={HeroImage}
            alt="hero Image"
            className="text-primary h-auto place-self-center animate-bounce"
          />
        </div>
      </div>
      <GetStarted></GetStarted>
    </div>
  );
}

export default HeroSection;
