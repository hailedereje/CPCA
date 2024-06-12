import { getSingleCourseService } from "../../services/course/getSingleCourseService.js"

export const getSinglCourseController = async(req,res) => {
    try{
        const {id} = req.params
        await getSingleCourseService(id)
        .then(course => res.status(200).send({course}))
        // .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", ...err }))
    }catch(err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error", ...err })
    }
      
}