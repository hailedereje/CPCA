import { addTagsService } from "../../services/course/addTagService.js"

export const addTagsController = async (req,res) => {
    try { 
        await addTagsService({...req.body})
            .then(() => res.status(201).send({ message: "tags add successfully" , title: "course updated successfully"}))
            .catch((err) => res.status(500).send({ message: "something went wrong", title: "internal server error", ...err }))
    } catch(err) {
        return res.status(500).send({ message: "something went wrong", title: "internal server error", err })
    }
}