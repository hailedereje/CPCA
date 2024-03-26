import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { FormInput, SubmitBtn, UploadImageFile, UploadVideoFile } from "../components";
import SectionTitle from "../components/SectionTitle";

const CreateLessonForm = () => {
  const [lessonData, setLessonData] = useState({"title": "", "description": ""})
  
  return (
    <div className="container mt-5 p-5 shadow-md w-3/4 mx-auto grid gap-y-5">
      <SectionTitle text="Lesson Title"/>
      <FormInput type="text" name="title" />

      <SectionTitle text="Lesson Description"/>
      <FormInput type="description" name="description" />
    <UploadImageFile/>
    <UploadVideoFile/>
  </div>
  );

};

export default CreateLessonForm;
