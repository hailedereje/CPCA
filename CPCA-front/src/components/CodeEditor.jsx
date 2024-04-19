import { useEffect, useRef, useState } from "react"
import { SNIPTS,LANGUAGES } from "../assets/constants"
import { Output } from "./OutPut"
import { EditorModal } from "./Editor"
import { Languages, MobileSidebar } from "./CodeNavigation"

export const CodeEditor = () => {
 
    const editorRef = useRef()
    const [language, setLanguage] = useState('javascript')
    const [value, setValue] = useState(SNIPTS[language])
    const [isOpen,setIsOpen] = useState(false)

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }

    const onSelect = (language) => {
        console.log(language)
        setLanguage(language)
        setValue(SNIPTS[language])
    }

    return (
        <div className="flex flex-col bg-black w-full">
            <div className="grid lg:grid-cols-2 ssm:grid-cols-1 bg-[#0f0a19] w-full">
                <div className="flex items-start">
                    <div className="xs:hidden lg:block">
                        <Languages  onSelect={onSelect}/>
                    </div>
                    <MobileSidebar isOpen={isOpen} close={() => setIsOpen(false)} languages={LANGUAGES} onSelect={onSelect}/>
                    <div className="flex flex-col w-full overflow-hidden">
                        <div className="fixed inset-x-0 top-0 h-14 w-1/2 bg-gray-600 flex items-center justify-between px-5 z-20 gap-4 border border-gray-500">
                           <button className="lg:hidden" onClick={() => setIsOpen(state => !state)}>
                                <svg className="w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48" d="M88 152h336M88 256h336M88 360h336" />
                                </svg>
                           </button>
                            <div className="flex gap-4 w-full justify-end">
                                <button class="text-white p-1 border rounded">
                                    <svg className="w-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                                            <circle cx="12" cy="12" r="6" />
                                            <path stroke-linecap="round" d="M12 2v1m0 18v1m10-10h-1M3 12H2" />
                                            <path stroke-linecap="round" d="m19.07 4.93l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393" opacity="0.5" />
                                        </g>
                                    </svg>
                                </button>
                                <button class="text-white p-1 border rounded">
                                    <svg className="w-5 flex" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M16 3h6v6h-2V5h-4zM2 3h6v2H4v4H2zm18 16v-4h2v6h-6v-2zM4 19h4v2H2v-6h2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-14 lg:ml-12">
                             <EditorModal language={language} onMount={onMount} value={value} setValue={setValue} />
                        </div>
                    </div>

                </div>
                <div className="hidden lg:block">
                    <Output editorRef={value} language={language} />
                </div>
                
            </div>

        </div>
    )
}

