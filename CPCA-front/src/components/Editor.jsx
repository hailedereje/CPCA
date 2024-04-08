import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";


const screens = {
  'xs': '320px', // Extra small devices (phones)
  'ssm':'440px',
  'sm': '640px', // Small devices (phones)
  'md': '768px', // Medium devices (tablets)
  'lg': '1024px', // Large devices (desktops)
  'xl': '1280px', // Extra large devices (large desktops)
}
export const EditorModal = ({ language, onMount, setValue, value }) => {
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
    return (
        <Editor
            theme="vs-dark"
            line={10}
            height={screenHeight - 56}
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
            loading={<div>loading ...</div>}
        />
    )
}