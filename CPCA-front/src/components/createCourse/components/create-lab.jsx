import { defaultFroalaConfig } from "@/constants";
import { addInstruction } from "@/features/course/quizSlice";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { useDispatch } from "react-redux";
import { IconWrapper } from "./icon-wrapper";
import { GiTestTubes } from "react-icons/gi";
import 'froala-editor/css/themes/gray.min.css';
import { MdOutlineIntegrationInstructions, MdOutlineTitle } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";
import * as yup from 'yup';
import { useLoaderData, useNavigate, useNavigation, useParams } from "react-router-dom";
import { useCreateLab, useGetLab, useUpdateLab } from "../hooks/course-hooks";
import { fetchLab } from "../hooks/actions";
import { Loading } from "./loader";

const labValidationSchema = yup.object().shape({
    courseId: yup.string().required('Course ID is required.'),
    title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(100, 'Title cannot be longer than 100 characters.'),
    description: yup.string().required('Description is required.').min(10, 'Description must be at least 10 characters long.'),
    labManual: yup.string().required('Lab manual is required.').min(100, 'Lab manual must be at least 100 characters long.'),
});

export const UpdateLab = () => {
    const param = useParams();
    const {data,isLoading} = useGetLab(param.labId)
    return (
        <div className="w-full"> 
            {isLoading ? <Loading/>:<CreateLab data={data} title={"update Lab"}/>}
        </div>
    )
}
export const CreateLab = ({data,title}) => {
    const navigate = useNavigate();
    const param = useParams();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);
    
    const [labForm, setLabForm] = useState({
        courseId: param.id,
        title: data?.data.title || '',
        description: data?.data.description ||   '',
        labManual: data?.data.labManual ||   '',
    });

    const { mutateAsync: createLab } = useCreateLab(param.id)
    const { mutateAsync: updateLab } = useUpdateLab(param.id,param.labId)

    const onSubmit = async () => {
        try {
            setLoading(true);
            await labValidationSchema.validate(labForm).catch((err) => {
                setError(err.message);
                throw new Error(err.message);
            });

            if(data) {
                await updateLab({labId:data.data._id,labForm});
            }
                
            else {
                await createLab(labForm);
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center overflow-auto editor gap-6 w-full h-full p-4 relative">
            <div className="absolute top-2 left-2">
                <button onClick={() => navigate(-1)} className="flex gap-2 p-2 border bg-blue-400 text-white">
                    <span><AiFillBackward className="text-2xl" /></span>
                     Back
                </button>
            </div>
            <h1 className="text-center text-4xl font-bold capitalize">{title || "Create Lab"}</h1>
            <div className="max-w-4xl w-full p-4 rounded-md flex  xxs:flex-col md:flex-row gap-4 justify-between shadow-md bg-white">
                <div className="flex flex-col gap-4 w-full">
                    <span className="flex flex-col gap-4">
                        <span className="flex justify-between items-center gap-4">
                            <span className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" icon={<MdOutlineTitle />} />
                                <span >Title</span>
                            </span>
                        </span>
                        <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 ">
                            give your lab a title that best describes the lab. 
                        </span>
                    </span>
                    <input
                        type="text"
                        name="title"
                        value={labForm.title}
                        onChange={(e) => setLabForm({ ...labForm, title: e.target.value })}
                        className=" mt-1 p-2 w-full text-sm border border-gray-600 rounded-md text-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark "
                            />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <span className="flex flex-col gap-4">
                        <span className="flex justify-between items-center gap-4">
                            <span className="text-xl capitalize font-medium flex gap-4 items-center">
                                <IconWrapper bg="bg-blue-500" color="text-white" icon={<TbFileDescription />} />
                                <span >Description</span>
                            </span>
                        </span>
                        <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2 ">
                            describe the lab in detail. try to be as descriptive as possible.
                        </span>
                    </span>
                    <textarea
                        className=" mt-1 p-2 w-full text-sm border border-gray-600 rounded-md text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark "
                        value={labForm.description}
                        onChange={(e) => setLabForm({ ...labForm, description: e.target.value })}
                        placeholder="Lab Description"
                    />
                </div>
            </div>
            <div className="flex flex-col rounded-md gap-4 relative h-fit w-fit max-w-4xl p-4 shadow-md bg-white">
                <span className="flex flex-col gap-4">
                    <span className="text-xl capitalize font-medium flex gap-4 items-center">
                        <IconWrapper bg="bg-blue-500" color="text-white" icon={<MdOutlineIntegrationInstructions />} />
                        <span >Lab Manual</span>
                    </span>

                    <span className="text-xs lowercase xxs:line-clamp-1 md:line-clamp-2">
                        write a detailed lab manual that will guide students through the lab.
                        the content may include the lab objectives, materials, procedures, and expected outcomes and code snippets. 
                    </span>
                </span>
                <FroalaEditor
                    tag='div'
                    model={labForm.labManual}
                    config={{ ...defaultFroalaConfig, maxHeight: 500, theme: 'gray' }}
                    onModelChange={(model) => setLabForm({ ...labForm, labManual: model })}
                />
            </div>
            <button onClick={onSubmit} className="flex w-full max-w-xs justify-center items-center bg-blue-500 p-2 rounded-md text-white">
                <span className="xxs:text-sm md:text-lg capitalize">{loading ? "saving ...": "save Lab"}</span>
            </button>
        </div>
    );
};