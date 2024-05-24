import { addPrerequisiteService } from "../../services/course/addCoursePrerequisiteService.js"

export const addPrerequisiteController = async (req,res) => {
    try {
        const {id} = req.params
        const { courseId,prerequisites } = req.body
        await addPrerequisiteService(courseId,prerequisites)
        .then((course) => res.status(201).send({ message: "prerequisites add successfully" ,course}))
        .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", ...err }))
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error", ...err })
    }
    
}