import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams(); // 🔥 dynamic course id

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      // 1️⃣ Course details
      const courseRes = await axios.get(
        `http://localhost:5000/courses/${id}`
      );

      setCourse(courseRes.data);

      // 2️⃣ Sections
      const sectionRes = await axios.get(
        `http://localhost:5000/courses/${id}/sections`
      );

      // 3️⃣ Topics for each section
      const sectionsWithTopics = await Promise.all(
        sectionRes.data.map(async (section: any) => {
          const topicsRes = await axios.get(
            `http://localhost:5000/sections/${section.section_id}/topics`
          );

          return {
            title: section.section_title,
            lessons: topicsRes.data.map((t: any) => ({
              name: t.topic_title,
              preview: t.is_preview,
              video: t.video_url,
            })),
          };
        })
      );

      setSections(sectionsWithTopics);
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">

      <div className="row align-items-start">

        {/* LEFT */}
        <div className="col-lg-8">

          <h2>{course.course_name}</h2>
          <p className="text-muted mb-2">By {course.author_name}</p>

          <div className="d-flex gap-3 mb-2">
            <span>⭐ {course.rating}</span>
            <span className="badge bg-success">{course.level}</span>
          </div>

          <p className="mb-4">{course.description}</p>

          {/* 📚 CONTENT */}
          <h4 className="mb-3">Course Content</h4>

          <div className="accordion" id="courseAccordion">
            {sections.map((section, index) => (
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
                      {section.lessons.map((lesson: any, i: number) => (
                        <li
                          key={i}
                          className="list-group-item d-flex justify-content-between align-items-center"
                          style={{
                            cursor: lesson.preview ? "pointer" : "not-allowed",
                            opacity: lesson.preview ? 1 : 0.6,
                          }}
                          onClick={() =>
                            lesson.preview && setPreviewVideo(lesson.video)
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
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
              className="card-img-top"
            />

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

              <button
                className="btn btn-success w-100 mb-2"
                onClick={() => navigate(`/course/learn/${id}`)}
              >
                Enroll Now
              </button>

              <hr />

              <ul className="list-unstyled mb-0">
                <li>📅 {course.duration}</li>
                <li>♾️ {course.access_duration}</li>
                <li>🎓 {course.certificate ? "Certificate Included" : "No Certificate"}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* 🎬 PREVIEW MODAL */}
      {previewVideo && (
        <div
          className="modal fade show d-block"
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