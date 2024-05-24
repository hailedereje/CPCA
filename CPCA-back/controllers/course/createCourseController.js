import { createCourseService } from "../../services/course/createCourseService.js"

export const createCourseController = async (req, res) => {
    try {
        await createCourseService(req.body)
        .then(id => res.status(201).send(id))
        .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", ...err }))
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "something went wrong", title: "internal server error",err })
    }
  }