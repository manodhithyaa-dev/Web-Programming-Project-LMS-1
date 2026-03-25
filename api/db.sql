-- ==============================
-- DROP TABLES (optional reset)
-- ==============================
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS course_content;
DROP TABLE IF EXISTS course_details;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS student;

-- ==============================
-- STUDENT TABLE
-- ==============================
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ==============================
-- TEACHER TABLE
-- ==============================
CREATE TABLE teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    enterprise VARCHAR(100),
    years_of_experience INT
);

-- ==============================
-- COURSES TABLE (starts from 101)
-- ==============================
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL
) AUTO_INCREMENT = 101;

-- ==============================
-- COURSE CONTENT TABLE
-- ==============================
CREATE TABLE course_content (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE CASCADE
);

-- ==============================
-- COURSE DETAILS TABLE
-- ==============================
CREATE TABLE course_details (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(150),
    author INT,
    rating DECIMAL(2,1),
    level ENUM('Beginner', 'Intermediate', 'Advanced'),
    price DECIMAL(10,2),
    duration VARCHAR(50),
    access_duration VARCHAR(50),
    certificate BOOLEAN,
    description TEXT,
    course_content_id INT,

    FOREIGN KEY (course_id) REFERENCES courses(course_id)
        ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES teacher(teacher_id)
        ON DELETE SET NULL,
    FOREIGN KEY (course_content_id) REFERENCES course_content(content_id)
        ON DELETE CASCADE
);

-- ==============================
-- SECTIONS TABLE
-- ==============================
CREATE TABLE sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    content_id INT,
    section_title VARCHAR(150),

    FOREIGN KEY (content_id) REFERENCES course_content(content_id)
        ON DELETE CASCADE
);

-- ==============================
-- TOPICS TABLE
-- ==============================
CREATE TABLE topics (
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT,
    topic_title VARCHAR(150),
    video_url TEXT,
    is_preview BOOLEAN,

    FOREIGN KEY (section_id) REFERENCES sections(section_id)
        ON DELETE CASCADE
);

-- ==============================
-- INSERT STUDENTS (10)
-- ==============================
INSERT INTO student (full_name, email, password) VALUES
('Alice Johnson', 'alice1@mail.com', 'pwd1'),
('Bob Smith', 'bob2@mail.com', 'pwd2'),
('Charlie Brown', 'charlie3@mail.com', 'pwd3'),
('David Lee', 'david4@mail.com', 'pwd4'),
('Emma Watson', 'emma5@mail.com', 'pwd5'),
('Frank Miller', 'frank6@mail.com', 'pwd6'),
('Grace Hall', 'grace7@mail.com', 'pwd7'),
('Henry Ford', 'henry8@mail.com', 'pwd8'),
('Ivy Clark', 'ivy9@mail.com', 'pwd9'),
('Jack White', 'jack10@mail.com', 'pwd10');

-- ==============================
-- INSERT TEACHERS (10)
-- ==============================
INSERT INTO teacher (full_name, email, password, enterprise, years_of_experience) VALUES
('Dr. John Smith', 'john@mail.com', 'pwd', 'Google', 10),
('Dr. Sarah Lee', 'sarah@mail.com', 'pwd', 'Microsoft', 8),
('Dr. Alan Walker', 'alan@mail.com', 'pwd', 'Amazon', 12),
('Dr. Nina Patel', 'nina@mail.com', 'pwd', 'Meta', 7),
('Dr. Raj Kumar', 'raj@mail.com', 'pwd', 'Infosys', 9),
('Dr. Emily Stone', 'emily@mail.com', 'pwd', 'IBM', 11),
('Dr. Chris Evans', 'chris@mail.com', 'pwd', 'Tesla', 6),
('Dr. Sophia Turner', 'sophia@mail.com', 'pwd', 'Apple', 10),
('Dr. Daniel Craig', 'daniel@mail.com', 'pwd', 'Oracle', 13),
('Dr. Olivia Wilde', 'olivia@mail.com', 'pwd', 'Netflix', 5);

-- ==============================
-- INSERT COURSES (10 → starts from 101)
-- ==============================
INSERT INTO courses (course_name) VALUES
('Full Stack Development'),
('Data Structures'),
('Machine Learning'),
('Cyber Security'),
('Cloud Computing'),
('Java Programming'),
('Python for Beginners'),
('UI UX Design'),
('DevOps Engineering'),
('Blockchain Basics');

-- ==============================
-- INSERT COURSE CONTENT (10)
-- ==============================
INSERT INTO course_content (course_id) VALUES
(101),(102),(103),(104),(105),(106),(107),(108),(109),(110);

-- ==============================
-- INSERT COURSE DETAILS (10)
-- ==============================
INSERT INTO course_details (
    course_id, course_name, author, rating, level, price,
    duration, access_duration, certificate, description, course_content_id
) VALUES
(101,'Full Stack Development',1,4.8,'Intermediate',5000,'40 hrs','6 months',TRUE,'Full stack course',1),
(102,'Data Structures',2,4.7,'Beginner',3000,'30 hrs','6 months',TRUE,'DS basics',2),
(103,'Machine Learning',3,4.9,'Advanced',7000,'50 hrs','1 year',TRUE,'ML concepts',3),
(104,'Cyber Security',4,4.6,'Intermediate',4500,'35 hrs','6 months',TRUE,'Security course',4),
(105,'Cloud Computing',5,4.5,'Intermediate',6000,'45 hrs','1 year',TRUE,'Cloud basics',5),
(106,'Java Programming',6,4.4,'Beginner',2500,'25 hrs','6 months',TRUE,'Java course',6),
(107,'Python for Beginners',7,4.8,'Beginner',2000,'20 hrs','6 months',TRUE,'Python basics',7),
(108,'UI UX Design',8,4.3,'Beginner',3500,'30 hrs','6 months',FALSE,'Design course',8),
(109,'DevOps Engineering',9,4.7,'Advanced',6500,'40 hrs','1 year',TRUE,'DevOps tools',9),
(110,'Blockchain Basics',10,4.6,'Intermediate',5500,'35 hrs','6 months',TRUE,'Blockchain intro',10);

-- ==============================
-- INSERT SECTIONS (15)
-- ==============================
INSERT INTO sections (content_id, section_title) VALUES
(1,'Intro'),(1,'Frontend'),
(2,'Basics'),(2,'Advanced DS'),
(3,'ML Intro'),(3,'Deep Learning'),
(4,'Security Basics'),(4,'Ethical Hacking'),
(5,'Cloud Intro'),(5,'AWS'),
(6,'Java Basics'),
(7,'Python Intro'),
(8,'Design Principles'),
(9,'CI/CD'),
(10,'Blockchain Intro');

-- ==============================
-- INSERT TOPICS (15+)
-- ==============================
INSERT INTO topics (section_id, topic_title, video_url, is_preview) VALUES
(1,'Welcome','https://vid1.com',TRUE),
(1,'Overview','https://vid2.com',TRUE),
(2,'HTML','https://vid3.com',FALSE),
(2,'CSS','https://vid4.com',FALSE),
(3,'Arrays','https://vid5.com',TRUE),
(4,'Trees','https://vid6.com',FALSE),
(5,'ML Basics','https://vid7.com',TRUE),
(6,'Neural Nets','https://vid8.com',FALSE),
(7,'Security Intro','https://vid9.com',TRUE),
(8,'Hacking','https://vid10.com',FALSE),
(9,'Cloud Intro','https://vid11.com',TRUE),
(10,'AWS Setup','https://vid12.com',FALSE),
(11,'Java Syntax','https://vid13.com',TRUE),
(12,'Python Basics','https://vid14.com',TRUE),
(13,'UI Basics','https://vid15.com',FALSE),
(14,'Pipelines','https://vid16.com',FALSE),
(15,'Blockchain','https://vid17.com',TRUE);