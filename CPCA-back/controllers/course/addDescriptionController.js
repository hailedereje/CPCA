import { addDescriptionService } from "../../services/course/addDescriptionService.js"

export const addDescriptionController = async(req,res) => {
    try {
        await addDescriptionService(req.body)
            .then(() => res.status(201).send({ message: "description added successfully"}))
            .catch((err) => res.status(500).send("error occured"))
    }catch(error) {
        console.log(error)
        res.status(500).send({ message: "something went wrong", title: "internal server error", ...error })
    }
}