import { addObjectiveService } from "../../services/course/addObjectiveService.js"

export const addObjectiveController = async(req,res) => {
    try {
        await addObjectiveService(req.body)
            .then(() => res.status(201).send({ message: "objective added successfully"}))
            .catch((err) => res.status(500).send("error occured"))
    }catch(error) {
        console.log(error)
        res.status(500).send({ message: "something went wrong", title: "internal server error", ...error })
    }
}