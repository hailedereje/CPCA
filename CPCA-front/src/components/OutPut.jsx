// import { useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { excuteCode } from "../EditorApi";
import { useState } from "react";

export const Output = () => {
    const [output,setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError,setIsError] = useState(false)
    const { editorContent } = useSelector(x => x.editorState)
    // const toast = useToast();
    const runCode = async () => {
        if(!editorContent.code) return ;
        try{
            setIsLoading(true)
            const {run: result} = await excuteCode(editorContent.language,editorContent.code)
            result.stderr ? setIsError(true) : setIsError(false)
            
            const output = result.output.split("\n")
            const cleaned = output.filter(data =>  data.trim() !== '').slice(0,4)
            
            setOutput(cleaned)
        } catch(error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    } 

    return (
        <div className="flex flex-col items-start h-full w-full">
            {/* <div className="fixed inset-x-0 top-0 w-full h-14 bg-gray-600 flex items-center justify-between px-4 py-2 gap-4 border border-gray-500">
                
            </div> */}
            
            <div className={`mt-14 w-full p-4 rounded-sm  ${isError ? "border border-red-500 text-red-400": "text-white border-[#333]"}`}>
                {output ? output.map((line,idx) => (
                    <p key={idx} className="font-normal text-md">{line}</p>
                )) 
                : <p className="text-gray-400">'Click "Run code" to see the output here'</p>}
            </div>
        </div>
    ) 
}


export const RunCodeButton = () => {
    return (
        <button className="fixed bottom-20 right-10 z-30">
            <svg  className="w-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <path fill="currentColor" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128" />
            </svg>
        </button>
    )
}

export const runCode = async (ref,language) => {
    const sourceCode = ref
    console.log(sourceCode)
    if(!sourceCode) return ;
    try{
        // setIsLoading(true)
        const {run: result} = await excuteCode(language,sourceCode)
        // result.stderr ? setIsError(true) : setIsError(false)
        
        const output = result.output.split("\n")
        const cleaned = output.filter(data =>  data.trim() !== '')
        return cleaned;
        // setOutput(cleaned)
    } catch(error) {
        console.log(error)
        return;
        // toast({
        //     title: "An error occured",
        //     description:error.message || "unable to run the code",
        //     status: "error",
        //     duration: 2000
        // })
    }
    finally{
        // setIsLoading(false)
    }
}