import { setCode } from "@/features/editor/editorSlice";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";


const screens = {
  'xs': '320px', // Extra small devices (phones)
  'ssm':'440px',
  'sm': '640px', // Small devices (phones)
  'md': '768px', // Medium devices (tablets)
  'lg': '1024px', // Large devices (desktops)
  'xl': '1280px', // Extra large devices (large desktops)
}
export const EditorModal = ({ language, value }) => {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const editorRef = useRef()
  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
}
  
    return (
        <Editor
            className="overflow-hidden border"
            line={1}
            theme="vs-dark"
            height={screenHeight -56}
            width={screenWidth - 56}
            language={language}
            value={value}
            onMount={onMount}
            onChange={(code) => dispatch(setCode({code}))}
            loading={<div>loading ...</div>}
        />
    )
}