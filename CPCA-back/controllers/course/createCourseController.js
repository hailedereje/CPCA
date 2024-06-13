import Course from "../../models/course.js"
import { createCourseService } from "../../services/course/createCourseService.js"

export const createCourseController = async (req, res) => {
    try {
        await createCourseService(req.body)
        .then(id => res.status(201).send(id))
        .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", err: err}))
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error",err })
    }
  }

  export const updateCourseController = async (req, res) => {
    try{
        const { courseId } = req.params
        const {title,author,duration,level } = req.body
        const course = await Course.findByIdAndUpdate(courseId, { title,author,duration,level },{new:true})
    } catch(err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error",err })
    }
    }

export const publishCourseController = async (req,res) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id)
        if(!course) return res.status(404).send({ message: "course not found", title: "not found" })
        course.isPublished = true
        await course.save()
        return res.status(201).json({message: "course published"})
    } catch(err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error",err })
    }
}