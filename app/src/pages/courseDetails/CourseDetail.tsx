import { useState } from "react";

const course = {
  title: "React Bootcamp",
  author: "John Doe",
  rating: 4.5,
  students: 12000,
  price: 999,
  description:
    "Learn React from scratch and build real-world projects.",
  duration: "6 weeks",
  level: "Beginner",
  validity: "Lifetime access",
  certificate: true,
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  sections: [
    {
      title: "Introduction",
      lessons: [
        { name: "What is React?", preview: true },
        { name: "Setup", preview: false },
        { name: "First App", preview: false },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        { name: "Components", preview: true },
        { name: "Props", preview: false },
        { name: "State", preview: false },
      ],
    },
    {
      title: "Advanced Topics",
      lessons: [
        { name: "Routing", preview: true },
        { name: "Context API", preview: false },
      ],
    },
  ],
};

const CourseDetail = () => {
  const [wishlist, setWishlist] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  return (
    <div className="container mt-4">

      <div className="row align-items-start">

        {/* LEFT */}
        <div className="col-lg-8">

          <h2>{course.title}</h2>
          <p className="text-muted mb-2">By {course.author}</p>

          <div className="d-flex gap-3 mb-2">
            <span>⭐ {course.rating}</span>
            <span>{course.students} students</span>
            <span className="badge bg-success">{course.level}</span>
          </div>

          <p className="mb-4">{course.description}</p>

          {/* 📚 SYLLABUS */}
          <h4 className="mb-3">Course Content</h4>

          <div className="accordion" id="courseAccordion">
            {course.sections.map((section, index) => (
              <div key={index} className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    data-bs-toggle="collapse"
                    data-bs-target={`#section${index}`}
                  >
                    {section.title}
                  </button>
                </h2>

                <div
                  id={`section${index}`}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                  data-bs-parent="#courseAccordion"
                >
                  <div className="accordion-body">

                    <ul className="list-group">
                      {section.lessons.map((lesson, i) => (
                        <li
                          key={i}
                          className={`list-group-item d-flex justify-content-between align-items-center ${
                            lesson.preview ? "cursor-pointer" : ""
                          }`}
                          style={{
                            cursor: lesson.preview ? "pointer" : "not-allowed",
                            opacity: lesson.preview ? 1 : 0.6,
                          }}
                          onClick={() =>
                            lesson.preview &&
                            setPreviewVideo(
                              "https://www.youtube.com/embed/dGcsHMXbSOA"
                            )
                          }
                        >
                          {lesson.name}

                          {lesson.preview && (
                            <span className="badge bg-primary">
                              Preview
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          <div
            className="card shadow-sm"
            style={{ position: "sticky", top: "100px" }}
          >
            <img src={course.image} className="card-img-top" />

            <div className="card-body">
              <h4>₹{course.price}</h4>

              <button
                className={`btn w-100 mb-2 ${
                  wishlist ? "btn-danger" : "btn-outline-secondary"
                }`}
                onClick={() => setWishlist(!wishlist)}
              >
                {wishlist ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
              </button>

              <button className="btn btn-success w-100 mb-2">
                Enroll Now
              </button>

              <hr />

              <ul className="list-unstyled mb-0">
                <li>📅 {course.duration}</li>
                <li>♾️ {course.validity}</li>
                <li>🎓 Certificate Included</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* 🎬 PREVIEW MODAL */}
      {previewVideo && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setPreviewVideo(null)}
        >
          <div className="modal-dialog modal-lg">
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-body p-0">
                <iframe
                  width="100%"
                  height="400"
                  src={previewVideo}
                  title="Preview"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;