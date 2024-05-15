import { api } from "@/api";
import { toast } from "react-toastify";

export const createCourseAction =  async ({ formData }) => {
    const data = formData
    try {
        const result = await store.dispatch(api.endpoints.createCourse.initiate(data))
        .unwrap();
        if(result) {
            toast.success("course created success fully")
            console.log(result)
        }
    }catch (err) {
        const errMessage = err?.data?.msg || "server Error . please try again"
        toast.error(errMessage)
    }
}