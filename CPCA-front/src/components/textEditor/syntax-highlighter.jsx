import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsFileEarmarkCheck } from "react-icons/bs";


import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.css';
import { MdContentCopy } from "react-icons/md";
import { Button } from "../ui/button";

export const SyntaxHighlighter = ({ code }) => {
    const codeRef = useRef(null);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500); // Optional: Reset copied state after 1.5 seconds
    };
    useEffect(() => {
        hljs.highlightElement(codeRef.current);
    }, [code.code]);

    return (
        <pre className="relative w-full">
            <CopyToClipboard text={code.code} onCopy={handleCopy}>
            <button className="absolute right-0 top-0 p-2">
                {copied ? <BsFileEarmarkCheck className="text-white"/>:<MdContentCopy className="text-white" />}
            </button>
            </CopyToClipboard>
            <span className="absolute left-0 -top-2 rounded p-1 text-xs bg-gray-600 text-white">{code.language}</span>
            <code ref={codeRef} className={`${code.language} w-full xl:max-w-3xl md:max-w-xl md:text-sm sm:text-xs overflow-scroll h-fit max-h-[300px] p-5 rounded-md editor`}>
                {code.code || "// add some code"}
            </code>
            
        </pre>
    );
}