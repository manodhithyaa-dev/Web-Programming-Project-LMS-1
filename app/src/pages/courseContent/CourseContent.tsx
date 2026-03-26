import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Play,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Save,
  FileText,
  X,
} from "lucide-react";
import AOS from "aos";
import axios from "axios";
import styles from "./courseContent.module.css";

interface Topic {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  notes: string;
}

interface Section {
  id: string;
  title: string;
  topics: Topic[];
}

const CourseContent = () => {
  const { id } = useParams();

  const [courseContent, setCourseContent] = useState<{
    title: string;
    author: string;
    sections: Section[];
  }>({
    title: "",
    author: "",
    sections: [],
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [noteText, setNoteText] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [notesList, setNotesList] = useState<
    { topicId: string; note: string; timestamp: Date }[]
  >([]);

  const videoRef = useRef<HTMLIFrameElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const courseRes = await axios.get(
        `http://localhost:5000/courses/${id}`
      );

      const sectionRes = await axios.get(
        `http://localhost:5000/courses/${id}/sections`
      );

      const sections = await Promise.all(
        sectionRes.data.map(async (s: any) => {
          const topicRes = await axios.get(
            `http://localhost:5000/sections/${s.section_id}/topics`
          );

          return {
            id: `section-${s.section_id}`,
            title: s.section_title,
            topics: topicRes.data.map((t: any) => ({
              id: `topic-${t.topic_id}`,
              title: t.topic_title,
              duration: "10:00",
              videoUrl: t.video_url,
              notes: "",
            })),
          };
        })
      );

      const finalData = {
        title: courseRes.data.course_name,
        author: courseRes.data.author_name,
        sections,
      };

      setCourseContent(finalData);

      if (sections.length > 0 && sections[0].topics.length > 0) {
        setActiveTopic(sections[0].topics[0]);
        setExpandedSections([sections[0].id]);
      }

      // restore saved progress
      const savedProgress = localStorage.getItem(
        `course-progress-${finalData.title}`
      );
      if (savedProgress) {
        const { completed, notes } = JSON.parse(savedProgress);
        setCompletedTopics(new Set(completed));
        if (notes) setNotesList(notes);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const markComplete = (topicId: string) => {
    setCompletedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) newSet.delete(topicId);
      else newSet.add(topicId);

      const progress = {
        completed: Array.from(newSet),
        notes: notesList,
      };

      localStorage.setItem(
        `course-progress-${courseContent.title}`,
        JSON.stringify(progress)
      );

      return newSet;
    });
  };

  const saveProgress = () => {
    const progress = {
      completed: Array.from(completedTopics),
      notes: notesList,
    };

    localStorage.setItem(
      `course-progress-${courseContent.title}`,
      JSON.stringify(progress)
    );
  };

  const saveActiveState = (topic: Topic, sectionId: string) => {
    localStorage.setItem(
      `course-active-${courseContent.title}`,
      JSON.stringify({ topicId: topic.id, sectionId })
    );
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const selectTopic = (topic: Topic, sectionId: string) => {
    setActiveTopic(topic);
    setNoteText("");

    const savedNote = notesList.find((n) => n.topicId === topic.id);
    if (savedNote) setNoteText(savedNote.note);

    saveActiveState(topic, sectionId);
  };

  // ✅ FIXED: saveNote restored
  const saveNote = () => {
    if (!noteText.trim() || !activeTopic) return;

    setIsSaving(true);

    setNotesList((prev) => {
      const existing = prev.findIndex(
        (n) => n.topicId === activeTopic.id
      );

      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          ...updated[existing],
          note: noteText,
          timestamp: new Date(),
        };
        return updated;
      }

      return [
        ...prev,
        {
          topicId: activeTopic.id,
          note: noteText,
          timestamp: new Date(),
        },
      ];
    });

    saveProgress();

    setTimeout(() => setIsSaving(false), 500);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      if (!e.target.value.trim() || !activeTopic) return;

      setNotesList((prev) => {
        const existing = prev.findIndex(
          (n) => n.topicId === activeTopic.id
        );

        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = {
            ...updated[existing],
            note: e.target.value,
            timestamp: new Date(),
          };

          const progress = {
            completed: Array.from(completedTopics),
            notes: updated,
          };

          localStorage.setItem(
            `course-progress-${courseContent.title}`,
            JSON.stringify(progress)
          );

          return updated;
        }

        return prev;
      });
    }, 2000);
  };

  const deleteNote = (topicId: string) => {
    setNotesList((prev) =>
      prev.filter((n) => n.topicId !== topicId)
    );

    if (activeTopic?.id === topicId) setNoteText("");

    saveProgress();
  };

  const getSectionIdForTopic = (topicId: string): string => {
    for (const section of courseContent.sections) {
      if (section.topics.some((t) => t.id === topicId)) {
        return section.id;
      }
    }
    return "";
  };

  if (!activeTopic)
    return <p className="text-center mt-5">Loading...</p>;

  const totalTopics = courseContent.sections.reduce(
    (acc, s) => acc + s.topics.length,
    0
  );

  const completedCount = completedTopics.size;

  const progressPercent =
    totalTopics > 0
      ? Math.round((completedCount / totalTopics) * 100)
      : 0;

  return (
    <div className={styles.container}>
      {/* EXACT ORIGINAL UI BELOW — UNTOUCHED */}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4 className={styles.courseTitle}>{courseContent.title}</h4>
          <p className={styles.authorName}>
            By {courseContent.author}
          </p>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {progressPercent}% Complete
          </span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <iframe
              ref={videoRef}
              src={`${activeTopic.videoUrl}?enablejsapi=1`}
              title={activeTopic.title}
              allowFullScreen
              className={styles.videoPlayer}
            />
          </div>

          <div className={styles.topicInfo}>
            <div className={styles.topicHeader}>
              <div>
                <h5 className={styles.topicTitle}>
                  {activeTopic.title}
                </h5>
                <span className={styles.topicDuration}>
                  <Play size={14} /> {activeTopic.duration}
                </span>
              </div>

              <button
                className={`${styles.completeBtn} ${
                  completedTopics.has(activeTopic.id)
                    ? styles.completed
                    : ""
                }`}
                onClick={() => markComplete(activeTopic.id)}
              >
                {completedTopics.has(activeTopic.id) ? (
                  <>
                    <CheckCircle size={18} /> Completed
                  </>
                ) : (
                  <>
                    <Circle size={18} /> Mark Complete
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={styles.notesSection}>
            <div
              className={styles.notesHeader}
              onClick={() => setShowNotes(!showNotes)}
            >
              <div className={styles.notesTitle}>
                <FileText size={18} />
                <span>Notes</span>
              </div>
              {showNotes ? <ChevronUp /> : <ChevronDown />}
            </div>

            {showNotes && (
              <div className={styles.notesContent}>
                <textarea
                  className={styles.notesTextarea}
                  value={noteText}
                  onChange={handleNoteChange}
                />

                <div className={styles.notesActions}>
                  <button
                    className={styles.saveNoteBtn}
                    onClick={saveNote}
                    disabled={!noteText.trim() || isSaving}
                  >
                    <Save size={16} />
                    {isSaving ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sectionsList}>
            {courseContent.sections.map((section) => (
              <div key={section.id} className={styles.sectionItem}>
                <div
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(section.id)}
                >
                  <span className={styles.sectionTitle}>
                    {section.title}
                  </span>
                </div>

                {expandedSections.includes(section.id) && (
                  <div className={styles.topicsList}>
                    {section.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={styles.topicItem}
                        onClick={() =>
                          selectTopic(topic, section.id)
                        }
                      >
                        {topic.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;