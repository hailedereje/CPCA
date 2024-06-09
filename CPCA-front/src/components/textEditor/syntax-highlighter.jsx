import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsFileEarmarkCheck } from "react-icons/bs";


import hljs from 'highlight.js';
import 'highlight.js/styles/an-old-hope.css';
import { MdContentCopy } from "react-icons/md";

export const SyntaxHighlighter = ({ code }) => {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    useEffect(() => {
        hljs.highlightElement(codeRef.current);
    }, [code]);

    return (
        <pre className="relative w-full flex flex-col">
            <div className="flex items-center justify-between gap-3 bg-[#565656] rounded-t-lg w-full xl:max-w-full md:max-w-xl">
            <span className="rounded p-1 text-xs  text-white">{code.language}</span>
                <CopyToClipboard text={code.content} onCopy={handleCopy}>
                    <button className="p-2">
                        {copied ? <BsFileEarmarkCheck className="text-white"/>:<MdContentCopy className="text-white" />}
                    </button>
                </CopyToClipboard>
            </div>
            <code ref={codeRef} className={`${code.language} w-full xl:max-w-full md:max-w-xl md:text-sm sm:text-xs overflow-auto h-fit max-h-[300px] p-5 editor`}>
                {code.content || "// add some code"}
            </code>
            
        </pre>
    );
}