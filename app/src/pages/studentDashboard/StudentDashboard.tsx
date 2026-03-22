import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Trophy, TrendingUp, Play, CheckCircle, BarChart3 } from "lucide-react";
import AOS from "aos";
import styles from "./studentDashboard.module.css";

interface EnrolledCourse {
  id: string;
  title: string;
  author: string;
  image: string;
  totalTopics: number;
  completedTopics: number;
  lastAccessed: Date | null;
  level: string;
  rating: number;
}

const defaultEnrolledCourses: EnrolledCourse[] = [
  {
    id: "101",
    title: "React Bootcamp",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    totalTopics: 9,
    completedTopics: 3,
    lastAccessed: new Date(Date.now() - 86400000),
    level: "Beginner",
    rating: 4.5,
  },
  {
    id: "102",
    title: "Machine Learning",
    author: "Andrew Ng",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    totalTopics: 12,
    completedTopics: 8,
    lastAccessed: new Date(Date.now() - 172800000),
    level: "Intermediate",
    rating: 4.9,
  },
  {
    id: "103",
    title: "Python for Beginners",
    author: "Alice Brown",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    totalTopics: 6,
    completedTopics: 0,
    lastAccessed: null,
    level: "Beginner",
    rating: 4.4,
  },
  {
    id: "104",
    title: "Full Stack Web Development",
    author: "David Wilson",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    totalTopics: 15,
    completedTopics: 15,
    lastAccessed: new Date(Date.now() - 604800000),
    level: "Intermediate",
    rating: 4.7,
  },
];

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "completed">("all");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    const saved = localStorage.getItem("enrolledCourses");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEnrolledCourses(parsed.map((c: EnrolledCourse) => ({
        ...c,
        lastAccessed: c.lastAccessed ? new Date(c.lastAccessed) : null,
      })));
    } else {
      setEnrolledCourses(defaultEnrolledCourses);
    }
  }, []);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    }
  }, [enrolledCourses]);

  const getProgress = (course: EnrolledCourse) => {
    return course.totalTopics > 0 ? Math.round((course.completedTopics / course.totalTopics) * 100) : 0;
  };

  const getTimeSinceLastAccess = (date: Date | null) => {
    if (!date) return "Never accessed";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const filteredCourses = enrolledCourses.filter((course) => {
    const progress = getProgress(course);
    if (activeTab === "in-progress") return progress > 0 && progress < 100;
    if (activeTab === "completed") return progress === 100;
    return true;
  });

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter((c) => getProgress(c) === 100).length;
  const inProgressCourses = enrolledCourses.filter((c) => getProgress(c) > 0 && getProgress(c) < 100).length;
  const totalTopicsCompleted = enrolledCourses.reduce((acc, c) => acc + c.completedTopics, 0);
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + getProgress(c), 0) / enrolledCourses.length)
    : 0;

  const continueLearning = (courseId: string) => {
    navigate(`/course/learn/${courseId}`);
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "#10b981";
    if (progress >= 50) return "#0056d2";
    if (progress > 0) return "#f59e0b";
    return "#e5e7eb";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.welcomeSection}>
          <h2 className={styles.welcomeTitle}>Welcome back, Learner!</h2>
          <p className={styles.welcomeSubtitle}>Continue your learning journey</p>
        </div>
        <button className={styles.exploreBtn} onClick={() => navigate("/course")}>
          <BookOpen size={18} />
          Explore More Courses
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard} data-aos="fade-up" data-aos-delay="0">
          <div className={styles.statIcon} style={{ background: "#eff6ff" }}>
            <BookOpen size={24} color="#0056d2" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalCourses}</span>
            <span className={styles.statLabel}>Enrolled Courses</span>
          </div>
        </div>

        <div className={styles.statCard} data-aos="fade-up" data-aos-delay="50">
          <div className={styles.statIcon} style={{ background: "#f0fdf4" }}>
            <CheckCircle size={24} color="#10b981" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{completedCourses}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>

        <div className={styles.statCard} data-aos="fade-up" data-aos-delay="100">
          <div className={styles.statIcon} style={{ background: "#fef3c7" }}>
            <TrendingUp size={24} color="#f59e0b" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{inProgressCourses}</span>
            <span className={styles.statLabel}>In Progress</span>
          </div>
        </div>

        <div className={styles.statCard} data-aos="fade-up" data-aos-delay="150">
          <div className={styles.statIcon} style={{ background: "#fce7f3" }}>
            <Trophy size={24} color="#ec4899" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalTopicsCompleted}</span>
            <span className={styles.statLabel}>Topics Completed</span>
          </div>
        </div>
      </div>

      <div className={styles.overallProgress} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.progressInfo}>
          <div className={styles.progressHeader}>
            <BarChart3 size={20} color="#0056d2" />
            <span className={styles.progressTitle}>Overall Progress</span>
          </div>
          <span className={styles.progressPercent}>{overallProgress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${overallProgress}%`,
              background: overallProgress === 100
                ? "linear-gradient(90deg, #10b981, #34d399)"
                : "linear-gradient(90deg, #0056d2, #00a3ff)",
            }}
          ></div>
        </div>
      </div>

      <div className={styles.coursesSection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "all" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Courses
          </button>
          <button
            className={`${styles.tab} ${activeTab === "in-progress" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("in-progress")}
          >
            In Progress
          </button>
          <button
            className={`${styles.tab} ${activeTab === "completed" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        <div className={styles.coursesGrid}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => {
              const progress = getProgress(course);
              return (
                <div
                  key={course.id}
                  className={styles.courseCard}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className={styles.courseImageWrapper}>
                    <img src={course.image} alt={course.title} className={styles.courseImage} />
                    <span className={`badge ${course.level === "Beginner" ? "bg-success" : course.level === "Intermediate" ? "bg-warning text-dark" : "bg-danger"} ${styles.levelBadge}`}>
                      {course.level}
                    </span>
                    {progress === 100 && (
                      <div className={styles.completedOverlay}>
                        <CheckCircle size={40} color="#10b981" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.courseBody}>
                    <h5 className={styles.courseTitle}>{course.title}</h5>
                    <p className={styles.courseAuthor}>By {course.author}</p>

                    <div className={styles.courseMeta}>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        {getTimeSinceLastAccess(course.lastAccessed)}
                      </span>
                      <span className={styles.metaItem}>
                        <TrendingUp size={14} />
                        ⭐ {course.rating}
                      </span>
                    </div>

                    <div className={styles.courseProgress}>
                      <div className={styles.progressInfo}>
                        <span className={styles.progressLabel}>
                          {course.completedTopics}/{course.totalTopics} topics
                        </span>
                        <span
                          className={styles.progressPercentSmall}
                          style={{ color: getProgressColor(progress) }}
                        >
                          {progress}%
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${progress}%`,
                            background: getProgressColor(progress),
                          }}
                        ></div>
                      </div>
                    </div>

                    <button
                      className={styles.continueBtn}
                      onClick={() => continueLearning(course.id)}
                    >
                      {progress === 0 ? (
                        <>
                          <Play size={16} />
                          Start Learning
                        </>
                      ) : progress === 100 ? (
                        <>
                          <CheckCircle size={16} />
                          Review Course
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          Continue Learning
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <BookOpen size={48} color="#9ca3af" />
              <h5>No courses found</h5>
              <p>
                {activeTab === "in-progress"
                  ? "You haven't started any courses yet."
                  : activeTab === "completed"
                  ? "You haven't completed any courses yet."
                  : "You haven't enrolled in any courses."}
              </p>
              <button className={styles.exploreBtn} onClick={() => navigate("/course")}>
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
