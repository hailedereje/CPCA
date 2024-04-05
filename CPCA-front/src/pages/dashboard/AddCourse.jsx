import { useState } from "react";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import UploadImageFile  from "../../components/UploadImageFile";
import axios from "axios";
import { useSelector } from "react-redux";

function AddCourse() {
  const user = useSelector((state) => state.userState.user);
  const [templateImage, setTemplateImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");

  let config = {
    documentReady: true,
    heightMax: 200,
    placeholderText: 'Edit Your Content Here!',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new course object
    const course = {
      title,
      description,
      objectives,
      templateImage,
    };
    console.log(course);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/courses/new", course, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `jwt=${user.token}`
        },
      });

      if (response.ok) {
        console.log("Course added successfully");
      } else {
        console.error("Failed to add course");
      }
    } catch (error) {
      console.error("Failed to connect to the API", error);
    }
  };
  return (
    <div>
      <h1 className="mb-10 font-bold text-lg">Add Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="templateImage">Template Image:</label>
          <UploadImageFile value={templateImage} onUploadImage={(e) => setTemplateImage(e)}/>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <FroalaEditorComponent tag='textarea' value={description} config={config} onModelChange={(e) => setDescription(e)}/>
        </div>
        <div>
          <label htmlFor="objectives">Objectives:</label>
          <FroalaEditorComponent tag='textarea' value={description} config={config} onModelChange={(e) => setObjectives(e)}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCourse;
