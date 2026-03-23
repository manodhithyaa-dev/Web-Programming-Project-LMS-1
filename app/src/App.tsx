import Navbar from "./components/navbar/Navbar"
import Landing from "./pages/landing/Landing";
import Footer from "./components/Footer/Footer";
import Courses from "./pages/courses/Courses"
import CourseDetail from "./pages/courseDetails/CourseDetail"
import CourseContent from "./pages/courseContent/CourseContent"
import StudentDashboard from "./pages/studentDashboard/StudentDashboard"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import TutorDashboard from "./pages/tutorDashboard/TutorDashboard";

function App() {
  return (
    <>
      <ScrollProgress />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/course/101" element={<CourseDetail />} />
          <Route path="/course/learn/:courseId" element={<CourseContent />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
/*

git add .
git commit -m "statement"
git push -u origin main

git config --global user.email "Snigdha-Neya-Baskar"
git config --global user.name "Snigdha Neya Baskar"

*/