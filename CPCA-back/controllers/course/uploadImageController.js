import Course from '../../models/course.js'

export const uploadImageController = async (req, res) => {
    try {
        const { courseId,url } = req.body
        const course = await Course.findById(courseId)
        if(!course) return res.status(404).json({message: "Course not found"})
        course.templateImg = url
        await course.save()
        res.status(200).json({message: "Image uploaded successfully"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}