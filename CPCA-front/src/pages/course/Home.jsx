import CourseList from "@/components/coursePages/CourseList";
import Features from "@/components/coursePages/Features";
import HeroSection from "@/components/coursePages/HeroSection";
import Navbar from "@/components/coursePages/Navbar";
import SearchBar from "@/components/coursePages/SearchBar";
import Footer from "@/components/footer/Footer";


function Home () {
  return (
    <div className="pt-20">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <CourseList />
      <Features />
      <Footer />
    </div>
  );
}

export default Home;
