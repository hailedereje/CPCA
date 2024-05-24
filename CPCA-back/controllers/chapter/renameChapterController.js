import { renameChapterService } from "../../services/chapter/renameChapterService.js"

export const renameChapterController = async (req,res) => {
    try {
        await renameChapterService(req.body)
            .then(() => res.status(200).send({message: "chapterName updated successfully"}))
            .catch(err => res.status(500).send({message: "chapter rename failed",err}))     
    }catch(error) {
        console.log(error)
        return res.status(500).send({message: "something wrong happend",error})
    }
}