import React from "react";
import arrow from "../assets/arrow.svg";
import { Link } from "react-router-dom";

const GetStarted = () => (
  <div className="hidden md:flex justify-center w-1/3 h-auto">
    <div className="flex flex-col w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer">
      <Link
        to="/Login"
        className="flex pl-6 -mt-7 ml-7 animate-ping text-white justify-center flex-col bg-green-1 w-[100%] h-[100%] rounded-full"
      >
        <div className="flex flex-row">
          <p className="font-poppins font-bold text-[18px] leading-[23.4px]">
            <span>Get</span>
          </p>
          <img
            src={arrow}
            alt="arrow-up"
            className="w-[23px] h-[23px] object-contain pl-2"
          />
        </div>
        <p className="font-poppins font-bold text-[22px] leading-[23.4px]">
          <span>Started</span>
        </p>
      </Link>
    </div>
  </div>
);

export default GetStarted;
