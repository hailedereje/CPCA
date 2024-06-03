import { LANGUAGES, LANGUAGE_List } from "@/assets/constants"
import { Editor } from "@monaco-editor/react"
import { useRef, useState } from "react"
import { FaPlay } from "react-icons/fa"
import { RiArrowDropDownLine } from "react-icons/ri"
import {  SidebarDrawer } from "../createCourse/updateCourse"
import { excuteCode } from "@/EditorApi"
import { showErrorToast } from "@/toasts/toast"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export const LabPractice = () => {
    const editorRef = useRef()
    const [code, setCode] = useState({ language: 'javascript', content: '' })
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [output,setOutput] = useState(null)

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }

    const runCode = async() => {
        if(!code.content) return ;
        try {
            setLoading(true)
            const { run: result } = await excuteCode({ language:code.language,code:code.content, version: LANGUAGES[code.language].version })
            result.stderr ? setError(true) : setError(false)
            
            const outPut = result.output.split("\n");
            const cleaned = outPut.filter(data => data.trim() !== "")
            setOutput(cleaned)

        } catch(error) {
            // showErrorToast("code did not compiled successfull pls check your connection and try again")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full h-screen flex gap-2 border p-2">
            <LabManual/>
            <div className="flex flex-col md:w-1/2 xxs:w-full">
                <div className="h-fit w-full p-1 bg-gray-600 rounded-t-md flex items-center justify-between gap-4">
                    <CodeMenu code={code} setCode={setCode} />
                    <div className="flex gap-2">
                        <button onClick={runCode} className="bg-blue-500 w-16 flex justify-center items-center  hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2 capitalize" >
                            {loading ?  <span className="text-center"><AiOutlineLoading3Quarters className="animate-spin" /></span>:<span className="flex gap-2 items-center"><FaPlay/>run</span> }    
                        </button>
                        <button onClick={() => setOutput('')} className="capitalize border text-white text-sm py-1 px-2 rounded mr-2">
                            Clear
                        </button>
                    </div>
                </div>
                <div className="h-4/5  w-full border border-gray-500">
                    <Editor
                        theme='vs-dark'
                        className="w-full h-full"
                        line={1}
                        defaultLanguage='javascript'
                        language={code.language}
                        value={code.content}
                        onMount={onMount}
                        onChange={cont => setCode({ language: code.language, content: cont })}
                        loading={<div className="text-xl font-semibold capitalize">loading ...</div>}
                    />
                </div>

                <div className={`h-1/5 w-full border border-gray-500 dark:bg-gray-900 editor text-sm overflow-auto p-2 ${error ? 'border-red-500 text-red-500' : "dark:text-white"}`}>
                    {output ? ( output.map((line, idx) => (
                        <p key={idx} className="text-sm">
                            {line}
                        </p>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">
                            click "Run" to see the output here'
                        </p>
                    )}
                </div>
            </div>

        </div>
    )

}

const LabManual = () => {
    return (
        <>
            <div className="w-1/2 h-full xxs:hidden md:block border">
                instruction
            </div>
            <div className="md:hidden">
                <SidebarDrawer>
                    <div className="w-1/2 h-full ">
                        instruction
                    </div>
                </SidebarDrawer>
            </div>
        </>
    )
}
const CodeMenu = ({ code, setCode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const languages = LANGUAGE_List
    return (
        <div className="relative inline-block">
            <button className="z-20 border text-white py-2 px-4 rounded  flex gap-3 items-center" onClick={() => setIsMenuOpen(prev => !prev)}>
                <span className='text-xs capitalize'>{code.language}</span>
                <span ><RiArrowDropDownLine /></span>
            </button>
            {isMenuOpen && (
                <div className="fixed h-screen w-screen inset-0 z-30 cursor-default" onClick={() => setIsMenuOpen(false)}></div>
            )}
            {isMenuOpen && (
                <div className="absolute top-10 left-0 w-48 h-48 overflow-auto editor bg-white border-gray-200 z-30 rounded shadow-lg dark:bg-gray-700 dark:text-white">
                    {languages.map((item, idx) => (
                        <button key={idx} onClick={() => {
                            setCode(prev => ({ language: item.name, content: code.content }))
                            setIsMenuOpen(false)
                        }} className={`group flex items-center gap-2 p-2 capitalize text-black dark:hover:bg-gray-500 w-full text-left ${code.language === item.name ? "bg-[#32bc6e] text-white hover:bg-[#32bc6e]" : ""}`}>
                            <span className='dark:text-white'>{item.icon}</span>
                            <span className="text-xs w-full dark:text-white">{item.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};