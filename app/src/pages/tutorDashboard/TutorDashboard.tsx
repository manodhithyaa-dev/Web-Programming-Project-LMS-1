import { useState, useEffect } from "react";
import styles from "./tutorDashboard.module.css";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Status = "in-progress" | "draft" | "published" | "archived";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  price: number;
  status: Status;
  sections: Section[];
}

const TutorDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<Status>("in-progress");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [step, setStep] = useState(0);

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) setCourses(JSON.parse(saved));
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // AUTO SAVE
  useEffect(() => {
    if (editingCourse) {
      const timeout = setTimeout(() => {
        localStorage.setItem("draftCourse", JSON.stringify(editingCourse));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [editingCourse]);

  const filtered = courses.filter((c) => c.status === activeTab);

  // ✅ STATUS UPDATE
  const updateStatus = (id: string, newStatus: Status) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  const createCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: "",
      description: "",
      level: "Beginner",
      price: 0,
      status: "in-progress",
      sections: [],
    };
    setEditingCourse(newCourse);
    setShowEditor(true);
    setStep(0);
  };

  const saveCourse = () => {
    if (!editingCourse) return;

    setCourses((prev) => {
      const exists = prev.find((c) => c.id === editingCourse.id);
      if (exists) {
        return prev.map((c) =>
          c.id === editingCourse.id ? editingCourse : c
        );
      }
      return [...prev, editingCourse];
    });

    setShowEditor(false);
    setEditingCourse(null);
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addSection = () => {
    if (!editingCourse) return;
    setEditingCourse({
      ...editingCourse,
      sections: [
        ...editingCourse.sections,
        { id: Date.now().toString(), title: "New Section", lessons: [] },
      ],
    });
  };

  const addLesson = (sectionId: string) => {
    if (!editingCourse) return;

    setEditingCourse({
      ...editingCourse,
      sections: editingCourse.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [
                ...s.lessons,
                {
                  id: Date.now().toString(),
                  title: "New Lesson",
                  videoUrl: "",
                },
              ],
            }
          : s
      ),
    });
  };

  const getYoutubeId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : "";
  };

  const validate = (course: Course) => {
    const issues: string[] = [];

    if (!course.title) issues.push("Missing title");
    if (!course.description) issues.push("Missing description");

    course.sections.forEach((s, i) => {
      s.lessons.forEach((l, j) => {
        if (!l.videoUrl) {
          issues.push(`Missing video in Section ${i + 1}, Lesson ${j + 1}`);
        }
      });
    });

    return issues;
  };

  return (
    <div className={styles.container}>
      <h2 className="mb-3">Tutor Dashboard</h2>

      {/* TABS */}
      <div className="mb-3">
        <div className="btn-group">
          {["in-progress", "draft", "published", "archived"].map((t) => (
            <button
              key={t}
              className={`btn ${
                activeTab === t ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveTab(t as Status)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CREATE BUTTON */}
      <button
        className="btn btn-primary d-flex align-items-center gap-2 mb-3"
        onClick={createCourse}
      >
        <Plus size={16} /> Create Course
      </button>

      {/* COURSE LIST */}
      <div className={styles.grid}>
        {filtered.map((course) => (
          <div key={course.id} className={styles.card}>
            <h4>{course.title || "Untitled Course"}</h4>
            <p>{course.level}</p>

            {/* ✅ STATUS BADGE */}
            <span
              className={`badge mb-2 ${
                course.status === "published"
                  ? "bg-success"
                  : course.status === "draft"
                  ? "bg-secondary"
                  : course.status === "archived"
                  ? "bg-dark"
                  : "bg-warning text-dark"
              }`}
            >
              {course.status}
            </span>

            {/* ✅ STATUS DROPDOWN */}
            <select
              className="form-select form-select-sm mb-2"
              value={course.status}
              onChange={(e) => {
                const newStatus = e.target.value as Status;

                if (newStatus === "published") {
                  const issues = validate(course);
                  if (issues.length > 0) {
                    alert("Fix validation errors before publishing");
                    return;
                  }
                }

                updateStatus(course.id, newStatus);
              }}
            >
              <option value="in-progress">In Progress</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => {
                setEditingCourse(course);
                setShowEditor(true);
              }}
            >
              <Pencil size={14} /> Edit
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteCourse(course.id)}
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      {showEditor && editingCourse && (
        <div className={styles.modal}>
          <div className={styles.editor}>
            {step === 0 && (
              <>
                <h3>Course Details</h3>

                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={editingCourse.title}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value,
                    })
                  }
                />
              </>
            )}

            {step === 1 && (
              <>
                <h3>Curriculum</h3>

                <button
                  className="btn btn-outline-secondary btn-sm mb-2"
                  onClick={addSection}
                >
                  + Section
                </button>

                {editingCourse.sections.map((sec) => (
                  <div key={sec.id} className={styles.section}>
                    <h5>{sec.title}</h5>

                    <button
                      className="btn btn-outline-secondary btn-sm mb-2"
                      onClick={() => addLesson(sec.id)}
                    >
                      + Lesson
                    </button>

                    {sec.lessons.map((lesson) => (
                      <div key={lesson.id} className={styles.lesson}>
                        <input
                          className="form-control mb-2"
                          value={lesson.title}
                          onChange={(e) => {
                            lesson.title = e.target.value;
                            setEditingCourse({ ...editingCourse });
                          }}
                        />

                        <input
                          className="form-control"
                          placeholder="YouTube URL"
                          value={lesson.videoUrl}
                          onChange={(e) => {
                            lesson.videoUrl = e.target.value;
                            setEditingCourse({ ...editingCourse });
                          }}
                        />

                        {lesson.videoUrl && (
                          <iframe
                            width="100%"
                            height="150"
                            src={`https://www.youtube.com/embed/${getYoutubeId(
                              lesson.videoUrl
                            )}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                <h3>Pricing</h3>

                <input
                  className="form-control"
                  type="number"
                  placeholder="Price"
                  value={editingCourse.price}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      price: +e.target.value,
                    })
                  }
                />
              </>
            )}

            {/* VALIDATION */}
            <div className={styles.validation}>
              <h5>Validation</h5>
              {validate(editingCourse).length === 0 ? (
                <p>✅ Ready to publish</p>
              ) : (
                validate(editingCourse).map((v, i) => (
                  <p key={i}>❌ {v}</p>
                ))
              )}
            </div>

            {/* NAVIGATION */}
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
              >
                Back
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => setStep(step + 1)}
                disabled={step === 2}
              >
                Next
              </button>

              <button className="btn btn-success" onClick={saveCourse}>
                Save Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;