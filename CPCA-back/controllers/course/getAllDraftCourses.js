import Course from "../../models/course.js"

export const getAllDraftCourses = async(req,res) => {
    try {
        await Course.find({ isPublished: false })
            .then((draftCourses) => res.status(200).send(draftCourses))
            .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", ...err }))
    }catch(error) {
        console.log(error)
        res.status(500).send({...error})
    }
}