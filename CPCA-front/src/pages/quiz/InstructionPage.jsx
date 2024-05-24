import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizDataFrombackend } from "../../Redux/action.js";
import { Link } from "react-router-dom";

export const InstructionPage = () => {
  const data = useSelector((state) => state.mernQuize.QuizData);
  const userName = useSelector((state) => state.mernQuize.userName);
  const instruction = useSelector((state) => state.mernQuize.instruction);

  return (
    <div className="margin-auto shadow-2xl h-96 w-11/12 ml-16 ">
      <h1 className="ml-44 mt-10">
        <strong className="text-teal-500 text-2xl pl-32 font-extrabold italic">
          Sweat more in practice, bleed less in war.
        </strong>{" "}
        <br /> <p className="ml-96 pl-28 font-bold">– Spartan Warrior Credo</p>
      </h1>
      <h1 className="ml-8 w-1/2 mt-4 text-2xl text-sky-600  ">
        Welcome! {userName}👋
      </h1>
      <div className="ml-8 mt-4">
        <h1 className="text-2xl font-extrabold">Read the instruction below before you start attempting the quiz!!!</h1>
        <p>{instruction}</p>
      </div>
      <div className="text-xl font-bold flex gap-2 m-8">
        <Link to="/">
          <button className="rounded-2xl border-red-500 bg-teal-300 border-2 p-1 pl-2 pr-2">Back</button>
        </Link>
        <Link to="/">
          <button className="rounded-2xl border-red-500 bg-teal-300 border-2 p-1 pl-2 pr-2">Attempt Quiz</button>
        </Link>
      </div>
      <div className="border-red-500 absolute  bg-teal-300 rounded-2xl right-24 top-44 border-2 mb-8 p-1 pl-2  pr-2 ">
        <Link to="/">
          <button className="text-xl font-bold rounded-md">Attempt Quiz</button>
        </Link>
      </div>
    </div>
  );
};
