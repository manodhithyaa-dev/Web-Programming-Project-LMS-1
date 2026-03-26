const express = require("express");
const cors = require("cors");
const conn = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ============================
   AUTH APIs
============================ */

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const studentQuery = "SELECT * FROM student WHERE email=? AND password=?";
    const teacherQuery = "SELECT * FROM teacher WHERE email=? AND password=?";

    conn.query(studentQuery, [email, password], (err, studentResult) => {
        if (err) return res.status(500).send(err);

        if (studentResult.length > 0) {
            return res.send({ role: "student", user: studentResult[0] });
        }

        conn.query(teacherQuery, [email, password], (err, teacherResult) => {
            if (err) return res.status(500).send(err);

            if (teacherResult.length > 0) {
                return res.send({ role: "teacher", user: teacherResult[0] });
            }

            res.status(401).send("Invalid credentials");
        });
    });
});

// REGISTER STUDENT
app.post("/register/student", (req, res) => {
    const { full_name, email, password } = req.body;

    const sql = "INSERT INTO student (full_name, email, password) VALUES (?, ?, ?)";
    conn.query(sql, [full_name, email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Student registered" });
    });
});

// REGISTER TEACHER
app.post("/register/teacher", (req, res) => {
    const { full_name, email, password, enterprise, years_of_experience } = req.body;

    const sql = `
        INSERT INTO teacher (full_name, email, password, enterprise, years_of_experience)
        VALUES (?, ?, ?, ?, ?)
    `;

    conn.query(sql, [full_name, email, password, enterprise, years_of_experience], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Teacher registered" });
    });
});

/* ============================
   COURSES APIs (FULL DATA)
============================ */

// GET ALL COURSES WITH FULL DETAILS
app.get("/courses", (req, res) => {
    const sql = `
        SELECT 
            c.course_id,
            cd.course_name,
            t.full_name AS author,
            cd.rating,
            cd.level,
            cd.duration
        FROM courses c
        JOIN course_details cd ON c.course_id = cd.course_id
        LEFT JOIN teacher t ON cd.author = t.teacher_id
    `;

    conn.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// GET COURSE DETAILS
app.get("/courses/:id", (req, res) => {
    const sql = `
        SELECT 
            cd.*,
            t.full_name AS author_name
        FROM course_details cd
        LEFT JOIN teacher t ON cd.author = t.teacher_id
        WHERE cd.course_id = ?
    `;

    conn.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result[0]);
    });
});

/* ============================
   COURSE CONTENT APIs
============================ */

// GET SECTIONS
app.get("/courses/:id/sections", (req, res) => {
    const sql = `
        SELECT s.* FROM sections s
        JOIN course_content cc ON s.content_id = cc.content_id
        WHERE cc.course_id = ?
    `;

    conn.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// GET TOPICS
app.get("/sections/:id/topics", (req, res) => {
    const sql = "SELECT * FROM topics WHERE section_id=?";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

/* ============================
   CREATE COURSE
============================ */

app.post("/courses", (req, res) => {
    const { course_name } = req.body;

    const sql = "INSERT INTO courses (course_name) VALUES (?)";

    conn.query(sql, [course_name], (err, result) => {
        if (err) return res.status(500).send(err);

        res.send({
            message: "Course created",
            course_id: result.insertId
        });
    });
});

/* ============================
   START SERVER
============================ */

app.listen(5000, () => {
    console.log("Server running on port 5000");
});