import { getChaptersService } from "../../services/chapter/getChaptersService.js"

export const getChaptersController = async(req,res) => {
    try{
        const {courseId} = req.query
        await getChaptersService(courseId)
            .then(result => res.status(200).send(result))
            .catch(err => res.status(400).send({err}))
    } catch(error) {
        return res.status(500).send({message: "internal server Error",error})
    }
}