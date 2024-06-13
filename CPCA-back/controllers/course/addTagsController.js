import Course from "../../models/course.js"

export const addTagsController = async (req,res) => {
    try {
        const { courseId, tags } = req.body
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        course.tags = req.body.tags
        await course.save()
        res.status(200).json({ message: "Tags added successfully" })

    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}