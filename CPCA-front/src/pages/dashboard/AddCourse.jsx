import { useState } from "react";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import UploadImageFile from "../../components/UploadImageFile";
import axios from "axios";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify';


var config = {
    documentReady: true,
    heightMax: 200,
    placeholderText: 'Edit Your Content Here!',
  };

  
function AddCourse() {
  const user = useSelector((state) => state.userState.user);
  const [templateImage, setTemplateImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [objectives, setObjectives] = useState("");

  

  console.log(description)
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
          <UploadImageFile value={templateImage} onUploadImage={(e) => setTemplateImage(e)} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }}>
          {/* {description} */}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <FroalaEditorComponent tag='textarea' value={description} config={config} onModelChange={(e) => {
            const sanitized = DOMPurify.sanitize(e)
          
          }} />
        </div>
        {/* <div>
          <label htmlFor="objectives">Objectives:</label>
          <FroalaEditorComponent tag='textarea' value={description} config={config} onModelChange={(e) => setObjectives(e)}/>
        </div> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


const Course = () => {
  const [showIcons, setShowIcons] = useState(false)
  return (
    <div className="flex gap-4">
      <button className="flex w-10 h-10 rounded-full border p-2 transform duration-75" onClick={() => setShowIcons(prev => !prev)}>
        {!showIcons ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill="currentColor" d="M10.5 2.75a.75.75 0 0 0-1.5 0V9H2.75a.75.75 0 0 0 0 1.5H9v6.25a.75.75 0 0 0 1.5 0V10.5h6.25a.75.75 0 0 0 0-1.5H10.5z" />
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
        </svg>
        }

      </button>
      {showIcons && <div className="flex gap-3 items-center">
        <button className="flex w-10 h-10 rounded-full border p-2 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3zm.008-12c.548 0 .992.445.992.993V13h-2V5H4v13.999L14 9l3 3v2.829l-3-3L6.827 19H14v2H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3zM8 7a2 2 0 1 1 0 4a2 2 0 0 1 0-4" />
          </svg>
        </button>

        <button className="flex w-10 h-10 rounded-full border p-2 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="m12.89 3l1.96.4L11.11 21l-1.96-.4zm6.7 9L16 8.41V5.58L22.42 12L16 18.41v-2.83zM1.58 12L8 5.58v2.83L4.41 12L8 15.58v2.83z" />
          </svg>
        </button>

        <button className="flex w-10 h-10 rounded-full border p-2 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21 6v2H3V6zM3 18h9v-2H3zm0-5h18v-2H3z" />
          </svg>
        </button>
      </div>}
    </div>
  )
}
export default AddCourse;
