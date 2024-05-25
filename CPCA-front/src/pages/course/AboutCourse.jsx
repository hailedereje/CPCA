import ClientFeedback from "@/components/coursePages/ClientFeedback";
import LearningObjectives from "@/components/coursePages/LearningObjectives";
import Navbar from "@/components/coursePages/Navbar";
import CourseList from "@/components/coursePages/RelatedCourses";
import ReviewForm from "@/components/coursePages/ReviewForm";
import Footer from "@/components/footer/Footer";


function AboutCourse () {
  return (
    <div className="pt-20">
      <Navbar />
      <div className="container mx-auto p-4">
        <LearningObjectives />
        <CourseList />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 bg-gray-200 p-16">
            <ClientFeedback />
            <ReviewForm />
        </div>
      <Footer />
    </div>
  );
}

export default AboutCourse;
