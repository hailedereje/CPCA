import Lab from "../../models/lab.js";
import Course from "../../models/course.js";

export const createLab = async (req, res) => {
    const { title, description, labManual, courseId } = req.body;
   try { 
        const lab = new Lab({
            title,
            description,
            labManual,
            courseId
        })
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.labs.push(lab._id);
        await course.save();
        await lab.save();
        return res.status(201).json(lab)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getLabs = async (req, res) => {
    const { courseId } = req.params;
    try {
        const labs = await Lab.find({ courseId });
        return res.status(200).json(labs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getLab = async (req, res) => {
    const { labId } = req.params;
    try {
        const lab = await Lab.findById(labId);
        if (!lab) {
            return res.status(404).json({ message: "Lab not found" });
        }
        return res.status(200).json(lab)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateLab = async (req, res) => {
    console.log(req.body)
    const { labId } = req.params;
    const { title, description, labManual } = req.body;
    try {
        const lab = await Lab.findById(labId);
        if (!lab) {
            return res.status(404).json({ message: "Lab not found" });
        }
        lab.title = title;
        lab.description = description;
        lab.labManual = labManual;
        await lab.save();
        return res.status(200).json(lab)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteLab = async (req, res) => {
    const { labId } = req.params;
    const { courseId } = req.query
    try {
        await Lab.findByIdAndDelete(labId);
        await Course.findByIdAndUpdate(courseId,{$pull: {labs: labId}})
        return res.status(200).json({ message: "Lab deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}