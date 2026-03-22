import { useState, useEffect } from "react";
import { coursesData } from "../../utils/data";
import AOS from "aos";

const Courses = () => {
  const [filters, setFilters] = useState({
    search: "",
    author: "",
    level: "",
    rating: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const handleChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const authors = [...new Set(coursesData.map((c) => c.author))];
  const levels = [...new Set(coursesData.map((c) => c.level))];

  const filteredCourses = coursesData.filter((course) => {
    return (
      course.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.author ? course.author === filters.author : true) &&
      (filters.level ? course.level === filters.level : true) &&
      (filters.rating ? course.rating >= Number(filters.rating) : true)
    );
  });

  const getLevelClass = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-success";
      case "Intermediate":
        return "bg-warning text-dark";
      case "Advanced":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container mt-4">

      <div className="row g-3 mb-4" data-aos="fade-up">

        <div className="col-md-3">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Search courses..."
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <select
            name="author"
            className="form-select"
            value={filters.author}
            onChange={handleChange}
          >
            <option value="">All Authors</option>
            {authors.map((author, i) => (
              <option key={i} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            name="level"
            className="form-select"
            value={filters.level}
            onChange={handleChange}
          >
            <option value="">All Levels</option>
            {levels.map((level, i) => (
              <option key={i} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select
            name="rating"
            className="form-select"
            value={filters.rating}
            onChange={handleChange}
          >
            <option value="">Min Rating</option>
            {[4, 4.5, 4.8].map((r, i) => (
              <option key={i} value={r}>
                {r}+
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() =>
              setFilters({ search: "", author: "", level: "", rating: "" })
            }
          >
            Reset
          </button>
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="row g-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={index * 50}>
              <div className="card h-100 shadow-sm position-relative">

                {/* 🔥 LEVEL BADGE */}
                <span
                  className={`badge ${getLevelClass(course.level)} position-absolute`}
                  style={{ top: "10px", right: "10px" }}
                >
                  {course.level}
                </span>

                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h6 className="fw-bold">{course.title}</h6>
                  <p className="mb-1 text-muted">By {course.author}</p>

                  <div className="d-flex justify-content-between">
                    <span>⭐ {course.rating}</span>
                    <span>{course.duration}</span>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>

    </div>
  );
};

export default Courses;