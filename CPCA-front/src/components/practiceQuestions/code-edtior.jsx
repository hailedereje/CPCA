import { LANGUAGES, LANGUAGE_List, SNIPTS } from "@/assets/constants"
import { Editor } from "@monaco-editor/react"
import { useEffect, useRef, useState } from "react"
import { FaPlay } from "react-icons/fa"
import { RiArrowDropDownLine } from "react-icons/ri"
import { SidebarDrawer } from "../createCourse/updateCourse"
import { excuteCode } from "@/EditorApi"
import { showErrorToast } from "@/toasts/toast"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useGetLab } from "../createCourse/hooks/course-hooks"
import { Loading } from "../createCourse/components/loader"
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView"
import { defaultFroalaConfig } from "@/constants"
import { useOutletContext, useParams } from "react-router-dom"
import { useCompleteLabMutation } from "@/api"

export const LabPractice = () => {
    const editorRef = useRef();
    const [code, setCode] = useState({ language: 'javascript', content: SNIPTS['javascript'] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [output, setOutput] = useState(null);

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const runCode = async () => {
        if (!code.content) return;
        setOutput('');
        try {
            setLoading(true);
            const { run: result } = await excuteCode({ language: code.language, code: code.content, version: LANGUAGES[code.language].version });
            result.stderr ? setError(true) : setError(false);

            const outPut = result.output.split("\n");
            const cleaned = outPut.filter(data => data.trim() !== "");
            setOutput(cleaned);
        } catch (error) {
            showErrorToast("Code did not compile successfully. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex p-1">
            <LabManual />
            <div className="flex flex-col md:w-1/2 xxs:w-full border">
                <div className="h-fit w-full p-1 bg-gray-800 flex items-center justify-between gap-4">
                    <CodeMenu code={code} setCode={setCode} />
                    <div className="flex gap-2">
                        <button onClick={runCode} className="bg-blue-600 w-20 flex justify-center items-center hover:bg-blue-700 text-white text-sm py-1 px-3 rounded mr-2 capitalize">
                            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <><FaPlay /> Run</>}
                        </button>
                        <button disabled={loading} onClick={() => setOutput('')} className="capitalize border text-white text-sm py-1 px-3 rounded mr-2 hover:bg-gray-700">
                            Clear
                        </button>
                    </div>
                </div>
                <div className="h-4/5 w-full">
                    <Editor
                        theme='vs-dark'
                        className="w-full h-full"
                        line={1}
                        defaultLanguage='javascript'
                        language={code.language}
                        value={code.content}
                        onMount={onMount}
                        onChange={cont => setCode({ language: code.language, content: cont })}
                        loading={<div className="flex justify-center items-center h-full">Loading ...</div>}
                    />
                </div>
                <div className={`h-1/5 max-h-32 w-full editor text-sm overflow-auto p-4 bg-gray-900 border-gray-600 ${error ? 'border-red-500 text-red-500' : 'dark:text-white'}`}>
                    {output ? (
                        output.map((line, idx) => (
                            <p key={idx} className="text-sm">
                                {line}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-800 text-sm">
                            {loading ? 'Loading ... ' : "Click 'Run' to see the output here"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const LabManual = () => {
    const param = useParams()
    const { data, isSuccess } = useGetLab(param.labId)
    const [completeLab] = useCompleteLabMutation();
    const {classroom} = useOutletContext();

    useEffect(() => {
        const labComplete = async () => {
            try {
              await completeLab({
                classroomId: classroom._id,
                courseId: classroom.courseId,
                labId: param.labId,
              }).unwrap();
            } catch (error) {
              toast.error("internal error, please try again later.");
            }
        };

        if (isSuccess) {
            labComplete();
        }
    }, [isSuccess, classroom, completeLab, param.labId]);

    return (
            <>
                <div className="w-1/2 h-[90vh] overflow-auto bg-gray-100 xxs:hidden md:block editor">
                    {isSuccess ? (
                        <div className="max-w-3xl bg-white flex flex-col gap-4 rounded-lg shadow-lg p-6">
                            <div className="flex gap-2 items-center mb-4">
                                <FaBook className="text-3xl text-blue-600 mr-2" />
                                <h1 className="text-3xl capitalize font-bold text-gray-800">{data.data.title}</h1>
                            </div>
                            <div className="flex flex-col items-start mb-6">
                                <span className="flex gap-2">
                                    <span>
                                        <MdDescription className="text-2xl text-green-500 mr-2" />
                                    </span>
                                    <span>
                                        <h2 className="text-xl font-semibold text-gray-800 capitalize">Description</h2>
                                    </span>
                                </span>
                                <p className="text-gray-700 text-sm pl-4">{data.data.description}</p>
                            </div>
                            <div className="rounded-md">
                                <div className="flex gap-2 items-center mb-2">
                                    <FaCheckCircle className="text-2xl text-teal-500 mr-2" />
                                    <h2 className="text-xl font-semibold text-gray-800 capitalize">Lab Manual</h2>
                                </div>
                                <div className="p-4 select-none text-black border-t-2 border-gray-300">
                                    <FroalaEditorView model={data.data.labManual} config={defaultFroalaConfig} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
                <div className="md:hidden">
                    <SidebarDrawer>
                        {isSuccess ? (
                            <div className="w-full h-full overflow-auto p-4 bg-gray-100">
                                <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-4">
                                    <div className="flex items-center mb-4">
                                        <FaBook className="text-2xl text-blue-600 mr-2" />
                                        <h1 className="text-md font-bold text-gray-800">{data.data.title}</h1>
                                    </div>
                                    <div className="flex items-start mb-6">
                                        <MdDescription className="text-xl text-green-500 mr-2" />
                                        <p className="text-gray-700 text-xs">{data.data.description}</p>
                                    </div>
                                    <div className="rounded-md">
                                        <div className="flex items-center mb-2">
                                            <FaCheckCircle className="text-xl text-teal-500 mr-2" />
                                            <h2 className="text-md font-semibold text-gray-800 capitalize">Lab Manual</h2>
                                        </div>
                                        <div className="p-4 select-none text-black border-t-2 border-gray-300 md:text-sm xxs:text-xs">
                                            <FroalaEditorView model={data.data.labManual} config={defaultFroalaConfig} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </SidebarDrawer>
                </div>
            </>
    
                    )
};

const CodeMenu = ({ code, setCode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const languages = LANGUAGE_List;

    return (
        <div className="relative inline-block">
            <button className="z-20 border text-white py-2 px-4 rounded flex gap-3 items-center bg-gray-700 hover:bg-gray-800" onClick={() => setIsMenuOpen(prev => !prev)}>
                <span className='text-xs capitalize'>{code.language}</span>
                <RiArrowDropDownLine />
            </button>
            {isMenuOpen && (
                <div className="fixed h-screen w-screen inset-0 z-30 cursor-default" onClick={() => setIsMenuOpen(false)}></div>
            )}
            {isMenuOpen && (
                <div className="absolute top-10 left-0 w-48 h-48 overflow-auto editor bg-white border-gray-200 z-30 rounded shadow-lg dark:bg-gray-700 dark:text-white">
                    {languages.map((item, idx) => (
                        <button key={idx} onClick={() => {
                            setCode(prev => ({ language: item.name, content: SNIPTS[item.name] }));
                            setIsMenuOpen(false);
                        }} className={`group flex items-center gap-2 p-2 capitalize text-black dark:hover:bg-gray-500 w-full text-left ${code.language === item.name ? "bg-green-500 text-white hover:bg-green-500" : ""}`}>
                            <span className='dark:text-white'>{item.icon}</span>
                            <span className="text-xs w-full dark:text-white">{item.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
