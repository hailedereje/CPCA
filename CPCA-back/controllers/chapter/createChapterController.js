import { createChapterService } from "../../services/chapter/createChapterService.js"

export const createChapterController = async (req,res) => {
    try {
        await createChapterService(req.body)
            .then(() => res.status(200).send({message: "chapter add Successfully"}))
            .catch((err) => res.status(500).send({ message: "error while proccessing th request ",err}) )
    } catch(error){
        console.log(error)
        return res.status(500).send({message: "internal server error",error})
    }
}