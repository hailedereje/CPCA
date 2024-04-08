import React, { useRef } from 'react';
 import { Editor } from '@tinymce/tinymce-react';

const apiKey = "onmw5krcef6r4kxb56lrn31ynqxtuwfxzno0lyiq8irc8n74"

const EditorComponent = () => {

  const handleEditorChange = (content, editor) => {
    console.log('Content:', content);
  }

  return (
    <div className="flex items-center justify-center ">
      <Editor
      
      initialValue="<p>This is some initial content.</p>"
      apiKey={apiKey} // Replace with your Tiny Cloud API key (optional)
      init={{
        height: 500,
        menubar: false,
        plugins: ['link', 'image', 'code'],
        toolbar: 'undo redo | bold italic | link image code',
      
      }}
      onChange={handleEditorChange}
    />
    </div>
    
  );
};

export default EditorComponent;

