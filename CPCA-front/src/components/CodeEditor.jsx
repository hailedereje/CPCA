import { useState } from "react"
import { Output } from "./OutPut"
import { EditorModal } from "./Editor"
import { Languages, MobileSidebar } from "./CodeNavigation"
import { useSelector } from "react-redux"
import { excuteCode } from "@/EditorApi"
import cpcaLogo from "../assets/cpcalogo.png"

export const CodeEditor = () => {
    const { editorContent,languages } = useSelector(x => x.editorState)
    const [isOpen, setIsOpen] = useState(false)
    const [output, setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const runCode = async () => {
        if (!editorContent.code) return;
        try {
            setIsLoading(true)
            const { run: result } = await excuteCode({language:editorContent.language, code:editorContent.code,version:languages[editorContent.language].version})
            result.stderr ? setIsError(true) : setIsError(false)

            const output = result.output.split("\n")
            const cleaned = output.filter(data => data.trim() !== '')

            setOutput(cleaned)
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col bg-black w-full">
            <div className="fixed inset-x-0 top-0 h-14 w-full bg-gray-600 flex items-center justify-between px-5 z-20 gap-4">
                <button className="lg:hidden" onClick={() => setIsOpen(state => !state)}>
                    <svg className="w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48" d="M88 152h336M88 256h336M88 360h336" />
                    </svg>
                </button>
                <div className="flex w-2/3">
                    <Logo/>
                </div>
                <div className="flex w-2/5 gap-4 justify-end">
                   
                        <button onClick={runCode} className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-1 rounded">
                            {isLoading ? <span className="flex w-fit">
                                <svg className="w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 22q-2.05 0-3.875-.788t-3.187-2.15q-1.363-1.362-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175Q6.3 3.575 8.124 2.788T12 2q.425 0 .713.288T13 3q0 .425-.288.713T12 4Q8.675 4 6.337 6.338T4 12q0 3.325 2.338 5.663T12 20q3.325 0 5.663-2.337T20 12q0-.425.288-.712T21 11q.425 0 .713.288T22 12q0 2.05-.788 3.875t-2.15 3.188q-1.362 1.362-3.175 2.15T12 22" />
                                </svg>
                            </span> : "Run"}
                        </button>
                        <button onClick={() => {
                            setIsError('')
                            setOutput('')
                        }} className="text-white px-5 py-1 border rounded">Clear</button>
                </div>
            </div>
            <div className="xs:hidden lg:block"> <Languages /> </div>
            <div className="flex sm:flex-col lg:flex-row w-full">
                        <div className="pt-14 pl-10 flex overflow-hidden w-full sm:w-full">
                            <EditorModal language={editorContent.language} value={editorContent.code} />
                        </div>
                <div className="pl-10 sm:pl-0 w-3/5">
                    <div className="flex flex-col items-start h-full w-full">
                        <div className={`mt-14 w-full p-4 rounded-sm  ${isError ? "border border-red-500 text-red-400" : "text-white border-[#333]"}`}>
                            {output ? output.map((line, idx) => (
                                <p key={idx} className="text-sm">{line}</p>
                            ))
                                : <p className="text-gray-400 text-sm">'Click "Run code" to see the output here'</p>}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


const Logo = () => {
    return (
        <h1 className="text-3xl font-bold flex items-center text-[#65B789]">
        <span className="mr-2 text-white">CP</span>
            CA 
        </h1>
    )
}