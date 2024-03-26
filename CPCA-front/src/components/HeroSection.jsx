import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.svg";
function HeroSection() {
  return (
    
    <div className="grid grid-cols-2 p-10  h-screen">
      <div className=" flex flex-col justify-center gap-y-3  items-start text-5xl pl-5 ">
        <h1 className="text-left">
          <span className=" text-primary">Happy Learning</span> app
        </h1>
        <p className="text-[20px] leading-relaxed">
         Dive into a world of
          programming courses designed to make you a pro. Whether you're a
          beginner or an experienced coder, we have something for everyone.
          Explore our vast library of courses today and embark on your journey
          to becoming a proficient programmer.
        </p>
        <Link to="/register" className="btn font-bold bg-neutral text-neutral-content">
          Login/Register
        </Link>
      </div>
      <div className="lg:grid sm:hidden">
        <img
          src={HeroImage}
          alt="hero Image"
          className="text-primary w-3/4 h-auto place-self-center animate-bounce"
        />
      </div>
    </div>
  );
}

export default HeroSection;
