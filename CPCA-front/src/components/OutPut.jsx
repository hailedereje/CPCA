// import { useToast } from "@chakra-ui/react"
import { excuteCode } from "../EditorApi";
import { useState } from "react";

export const Output = ({editorRef, language}) => {
    const [output,setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError,setIsError] = useState(false)

    // const toast = useToast();
    const runCode = async () => {

        const sourceCode = editorRef
        if(!sourceCode) return ;
        try{
            setIsLoading(true)
            const {run: result} = await excuteCode(language,sourceCode)
            result.stderr ? setIsError(true) : setIsError(false)
            
            const output = result.output.split("\n")
            const cleaned = outpuft.filter(data =>  data.trim() !== '').slice(0,4)
            
            setOutput(cleaned)
        } catch(error) {
            console.log(error)
            // toast({
            //     title: "An error occured",
            //     description:error.message || "unable to run the code",
            //     status: "error",
            //     duration: 2000
            // })
        }
        finally{
            setIsLoading(false)
        }
    } 

    return (
        <div className="flex flex-col items-start h-full w-full">
            <div className="fixed inset-x-0 top-0 w-full h-14 bg-gray-600 flex items-center justify-between px-4 py-2 gap-4 border border-gray-500">
                <p className="text-lg text-white"> output</p>
                <div className="flex gap-3">
                    <button onClick={runCode} class="text-white bg-blue-700 hover:bg-blue-800 px-5 py-1 rounded">
                    {isLoading ? <span className="flex w-fit">
                        <svg className="w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 22q-2.05 0-3.875-.788t-3.187-2.15q-1.363-1.362-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175Q6.3 3.575 8.124 2.788T12 2q.425 0 .713.288T13 3q0 .425-.288.713T12 4Q8.675 4 6.337 6.338T4 12q0 3.325 2.338 5.663T12 20q3.325 0 5.663-2.337T20 12q0-.425.288-.712T21 11q.425 0 .713.288T22 12q0 2.05-.788 3.875t-2.15 3.188q-1.362 1.362-3.175 2.15T12 22" />
                        </svg>
                    </span> : "Run"}
                </button>
                <button onClick={() => {
                    setIsError('')
                    setOutput('')
                }} class="text-white px-5 py-1 border rounded">Clear</button>
                </div>
                
            </div>
            
            <div className={`mt-14 w-full p-4 rounded-sm  ${isError ? "border border-red-500 text-red-400": "text-white border-[#333]"}`}>
                {output ? output.map((line,idx) => (
                    <p key={idx} className="font-normal text-md">{line}</p>
                )) 
                : <p className="text-white">'Click "Run code" to see the output here'</p>}
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