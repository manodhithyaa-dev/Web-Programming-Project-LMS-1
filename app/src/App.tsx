import Navbar from "./components/navbar/Navbar"
import Landing from "./pages/landing/Landing";
import Footer from "./components/Footer/Footer";
import Courses from "./pages/courses/Courses"
import CourseDetail from "./pages/courseDetails/CourseDetail"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Signup from "./pages/signup/Signup";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";

function App() {
  return (
    <>
      <ScrollProgress />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/course" element={<Courses />} />
          <Route path="/course/101" element={<CourseDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
