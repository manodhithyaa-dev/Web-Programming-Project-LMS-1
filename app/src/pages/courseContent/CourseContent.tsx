import { useState, useEffect, useRef } from "react";
import { Play, CheckCircle, Circle, ChevronDown, ChevronUp, Save, FileText, X } from "lucide-react";
import AOS from "aos";
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

const courseContent: {
  title: string;
  author: string;
  sections: Section[];
} = {
  title: "React Bootcamp",
  author: "John Doe",
  sections: [
    {
      id: "section-1",
      title: "Introduction to React",
      topics: [
        {
          id: "topic-1-1",
          title: "What is React?",
          duration: "10:30",
          videoUrl: "https://www.youtube.com/embed/N3AkSS5hXMA",
          notes: "",
        },
        {
          id: "topic-1-2",
          title: "Setting Up Development Environment",
          duration: "15:45",
          videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
          notes: "",
        },
        {
          id: "topic-1-3",
          title: "Creating Your First React App",
          duration: "12:20",
          videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
          notes: "",
        },
      ],
    },
    {
      id: "section-2",
      title: "Core Concepts",
      topics: [
        {
          id: "topic-2-1",
          title: "Understanding JSX",
          duration: "14:00",
          videoUrl: "https://www.youtube.com/embed/7f9G6ftyxPo",
          notes: "",
        },
        {
          id: "topic-2-2",
          title: "Components and Props",
          duration: "18:30",
          videoUrl: "https://www.youtube.com/embed/I_hunEDpZlg",
          notes: "",
        },
        {
          id: "topic-2-3",
          title: "State and Lifecycle",
          duration: "20:15",
          videoUrl: "https://www.youtube.com/embed/9fN96ps7fZY",
          notes: "",
        },
      ],
    },
    {
      id: "section-3",
      title: "Hooks Deep Dive",
      topics: [
        {
          id: "topic-3-1",
          title: "useState Hook",
          duration: "16:45",
          videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
          notes: "",
        },
        {
          id: "topic-3-2",
          title: "useEffect Hook",
          duration: "19:20",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          notes: "",
        },
        {
          id: "topic-3-3",
          title: "useContext Hook",
          duration: "14:50",
          videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
          notes: "",
        },
      ],
    },
  ],
};

const CourseContent = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["section-1"]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [activeTopic, setActiveTopic] = useState<Topic>(courseContent.sections[0].topics[0]);
  const [noteText, setNoteText] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [notesList, setNotesList] = useState<{ topicId: string; note: string; timestamp: Date }[]>([]);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    const savedProgress = localStorage.getItem(`course-progress-${courseContent.title}`);
    if (savedProgress) {
      const { completed, notes } = JSON.parse(savedProgress);
      setCompletedTopics(new Set(completed));
      if (notes) setNotesList(notes);
    }

    const savedActive = localStorage.getItem(`course-active-${courseContent.title}`);
    if (savedActive) {
      const { topicId, sectionId } = JSON.parse(savedActive);
      const section = courseContent.sections.find((s) => s.id === sectionId);
      const topic = section?.topics.find((t) => t.id === topicId);
      if (topic) {
        setActiveTopic(topic);
      }
    }
  }, []);

  const markComplete = (topicId: string) => {
    setCompletedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      const progress = {
        completed: Array.from(newSet),
        notes: notesList,
      };
      localStorage.setItem(`course-progress-${courseContent.title}`, JSON.stringify(progress));
      return newSet;
    });
  };

  const saveProgress = () => {
    const progress = {
      completed: Array.from(completedTopics),
      notes: notesList,
    };
    localStorage.setItem(`course-progress-${courseContent.title}`, JSON.stringify(progress));
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

  const saveNote = () => {
    if (!noteText.trim()) return;

    setIsSaving(true);
    setNotesList((prev) => {
      const existing = prev.findIndex((n) => n.topicId === activeTopic.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], note: noteText, timestamp: new Date() };
        return updated;
      }
      return [...prev, { topicId: activeTopic.id, note: noteText, timestamp: new Date() }];
    });

    saveProgress();

    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (e.target.value.trim()) {
        setNotesList((prev) => {
          const existing = prev.findIndex((n) => n.topicId === activeTopic.id);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = { ...updated[existing], note: e.target.value, timestamp: new Date() };
            const progress = {
              completed: Array.from(completedTopics),
              notes: updated,
            };
            localStorage.setItem(`course-progress-${courseContent.title}`, JSON.stringify(progress));
            return updated;
          }
          return prev;
        });
      }
    }, 2000);
  };

  const deleteNote = (topicId: string) => {
    setNotesList((prev) => prev.filter((n) => n.topicId !== topicId));
    if (activeTopic.id === topicId) setNoteText("");
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

  const totalTopics = courseContent.sections.reduce((acc, section) => acc + section.topics.length, 0);
  const completedCount = completedTopics.size;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4 className={styles.courseTitle}>{courseContent.title}</h4>
          <p className={styles.authorName}>By {courseContent.author}</p>
        </div>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className={styles.progressText}>{progressPercent}% Complete</span>
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
            ></iframe>
          </div>

          <div className={styles.topicInfo}>
            <div className={styles.topicHeader}>
              <div>
                <h5 className={styles.topicTitle}>{activeTopic.title}</h5>
                <span className={styles.topicDuration}>
                  <Play size={14} /> {activeTopic.duration}
                </span>
              </div>
              <button
                className={`${styles.completeBtn} ${completedTopics.has(activeTopic.id) ? styles.completed : ""}`}
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
            <div className={styles.notesHeader} onClick={() => setShowNotes(!showNotes)}>
              <div className={styles.notesTitle}>
                <FileText size={18} />
                <span>Notes</span>
                {notesList.filter((n) => n.topicId === activeTopic.id).length > 0 && (
                  <span className={styles.notesBadge}>1</span>
                )}
              </div>
              {showNotes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {showNotes && (
              <div className={styles.notesContent}>
                <textarea
                  className={styles.notesTextarea}
                  placeholder="Take notes for this topic..."
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
          <div className={styles.sidebarHeader}>
            <h6>Course Content</h6>
            <span className={styles.topicCount}>
              {completedCount}/{totalTopics} completed
            </span>
          </div>

          <div className={styles.sectionsList}>
            {courseContent.sections.map((section) => (
              <div key={section.id} className={styles.sectionItem} data-aos="fade-up">
                <div
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className={styles.sectionTitleWrapper}>
                    <ChevronDown
                      size={16}
                      className={`${styles.chevron} ${expandedSections.includes(section.id) ? styles.expanded : ""}`}
                    />
                    <span className={styles.sectionTitle}>{section.title}</span>
                  </div>
                  <span className={styles.sectionCount}>
                    {section.topics.filter((t) => completedTopics.has(t.id)).length}/{section.topics.length}
                  </span>
                </div>

                {expandedSections.includes(section.id) && (
                  <div className={styles.topicsList}>
                    {section.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={`${styles.topicItem} ${activeTopic.id === topic.id ? styles.activeTopic : ""} ${completedTopics.has(topic.id) ? styles.completedTopic : ""}`}
                        onClick={() => selectTopic(topic, section.id)}
                      >
                        <div className={styles.topicLeft}>
                          {completedTopics.has(topic.id) ? (
                            <CheckCircle size={16} className={styles.completedIcon} />
                          ) : (
                            <Play size={16} className={styles.playIcon} />
                          )}
                          <span className={styles.topicItemTitle}>{topic.title}</span>
                        </div>
                        <span className={styles.topicItemDuration}>{topic.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {notesList.length > 0 && (
            <div className={styles.allNotes}>
              <h6 className={styles.allNotesTitle}>All Notes</h6>
              {notesList.map((noteItem) => {
                const topic = courseContent.sections
                  .flatMap((s) => s.topics)
                  .find((t) => t.id === noteItem.topicId);
                return (
                  <div key={noteItem.topicId} className={styles.noteCard}>
                    <div className={styles.noteCardHeader}>
                      <span className={styles.noteTopicTitle}>
                        {topic?.title || "Unknown Topic"}
                      </span>
                      <div className={styles.noteActions}>
                        <button
                          className={styles.editNoteBtn}
                          onClick={() => {
                            if (topic) selectTopic(topic, getSectionIdForTopic(topic.id));
                          }}
                        >
                          View
                        </button>
                        <button
                          className={styles.deleteNoteBtn}
                          onClick={() => deleteNote(noteItem.topicId)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    <p className={styles.notePreview}>{noteItem.note.substring(0, 80)}...</p>
                    <span className={styles.noteTimestamp}>
                      {new Date(noteItem.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
