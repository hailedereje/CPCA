import { useState } from "react"
import * as Icons from "../assets/icons"
import { LANGUAGES } from "../assets/constants"

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


export const Languages = ({isMobile,onSelect}) => {
    const [active,setActive] = useState(1)
    const languages = LANGUAGES
    return (
        <div className="fixed inset-x-0 top-14 z-20 flex flex-col gap-4 h-full p-2 bg-gray-600 border border-gray-500 w-fit text-white">
            <button onClick={() => {
                onSelect(languages['c'].name)
                setActive(1)
                }} className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 1 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.CIcon />
                </span>
                {
                    isMobile && <p className="text-white">{languages['c'].name}</p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['c++'].name)
                    setActive(2)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 2 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.CPPIcon />
                </span>
                {
                    isMobile && <p className="">{languages['c++'].name}</p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['java'].name)
                    setActive(3)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 3 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.JavaIcon />
                </span>
                {
                    isMobile && <p className="">{languages['java'].name}</p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['javascript'].name)
                    setActive(4)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 4 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.JavascriptIcon />
                </span>
                {
                    isMobile && <p className="">{languages['javascript'].name} </p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['python'].name)
                    setActive(5)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 5 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.PythonIcon />
                </span>
                {
                    isMobile && <p className="">{languages['python'].name}</p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['typescript'].name)
                    setActive(6)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 6 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.TypeScriptIcon />
                </span>
                {
                    isMobile && <p className="">{languages['typescript'].name}</p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['php'].name)
                    setActive(7)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 7 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.PhpIcon />
                </span>
                {
                    isMobile && <p className="">{languages['php'].name}</p>
                }
            </button>
            <button onClick={() => {
                    onSelect(languages['csharp'].name)
                    setActive(8)
                }} 
                className={`flex items-center justify-center  p-1 rounded gap-3 border-gray-400 border ${active === 8 ? "bg-blue-500 border-none":""}`}>
                <span className="text-white">
                    <Icons.CsharpIcon />
                </span>
                {
                    isMobile && <p className="">{languages['csharp'].name}</p>
                }
            </button>
        </div>
    )
}