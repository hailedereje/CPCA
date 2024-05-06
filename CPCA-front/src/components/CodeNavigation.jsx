import { useState } from "react"
import * as Icons from "../assets/icons"
import { getCode } from "@/features/editor/editorSlice"
import { useDispatch, useSelector } from "react-redux"

export const MobileSidebar = ({isOpen,close,languages,onSelect}) => {
    return (
        <div className={`lg:hidden fixed inset-x-0 z-20  transition duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} top-0 h-screen w-full bg-black/20`}>
            <div onClick={close} className="absolute inset-x-0 top-0 w-full h-full" />
            <div className="absolute inset-x-0  top-0 w-fit h-full bg-gray-600 flex items-center justify-center">
                <Languages isMobile={false} languages={languages} onSelect={onSelect}/>  
            </div>
        </div>
    )
}


export const Languages = ({ isMobile }) => {
    const { languages,editorContent } = useSelector(x => x.editorState)
    const [activeLanguage, setActiveLanguage] = useState(editorContent.language);

    const languageList = [
        { name: languages.javascript.name, icon: <Icons.JavascriptIcon /> },
        { name: languages.typescript.name, icon: <Icons.TypeScriptIcon /> },
        { name: languages["c++"].name, icon: <Icons.CPPIcon /> },
        { name: languages.c.name, icon: <Icons.CIcon /> },
        { name: languages.java.name, icon: <Icons.JavaIcon /> },
        { name: languages.python.name, icon: <Icons.PythonIcon /> },
        { name: languages.csharp.name, icon: <Icons.CsharpIcon /> },
        { name: languages.php.name, icon: <Icons.PhpIcon /> }
    ];

    return (
        <div className="fixed inset-x-0 top-14 z-20 flex flex-col gap-4 h-full p-2 bg-gray-600 border border-gray-500 w-fit text-white">
            {languageList.map(lang => (
                <LanguageButton
                    key={lang.name}
                    language={lang.name}
                    icon={lang.icon}
                    isActive={lang.name === activeLanguage}
                    setActiveLanguage={setActiveLanguage}
                />
            ))}
        </div>
    );
};

const LanguageButton = ({ language, icon, isActive, setActiveLanguage }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getCode({ language }));
        setActiveLanguage(language);
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-center p-1 rounded gap-3 border-gray-400 border ${isActive ? "bg-blue-500 border-none" : ""}`}
        >
            <span className="text-white">{icon}</span>
        </button>
    );
};
