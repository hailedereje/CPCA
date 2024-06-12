import Course from "../../models/course.js"
import { getSingleCourseService } from "../../services/course/getSingleCourseService.js"

export const getSinglCourseController = async(req,res) => {
    try{
        const {id} = req.params
        console.log(id)
        const course = await getSingleCourseService(id)
        res.status(200).json({course})
    }catch(err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error", ...err })
    }
      
}