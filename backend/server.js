const express = require("express");

const {
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
  dbinitialize,
} = require("./database.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
app.get("/dbinitialize", async (req, res) => {
  try {
    console.log("DB is getting initialized");
    const data = await dbinitialize();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error initializing DB:", err);
    res.status(500).json({ error: "Failed to initialize database" });
  }
});

// ============== Teacher Routes ==============

// Get all teachers
app.get("/teachers", async (req, res) => {
  try {
    console.log("Request received to list teachers");
    const data = await readTeachers();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error listing teachers:", err);
    res.status(500).json({ error: "Failed to list teachers" });
  }
});

// Get one teacher by ID
app.get("/teachers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request received to get Teacher Info for ID:", id);
    const data = await readTeacherInfo(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error getting teacher info:", err);
    res.status(500).json({ error: "Failed to get teacher info" });
  }
});

// Add a new teacher
app.post("/teachers", async (req, res) => {
  try {
    const { id, name, age } = req.body;
    console.log("Request received to add teacher. Req body:", req.body);
    const data = await addTeacher(id, name, age);
    res.status(201).json(data);
  } catch (err) {
    console.error("Error adding teacher:", err);
    res.status(500).json({ error: "Failed to add teacher" });
  }
});

// Update teacher by ID
app.put("/teachers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    console.log("Request received to update teacher. ID:", id, "Body:", req.body);
    const data = await updateTeacher(name, age, id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error updating teacher:", err);
    res.status(500).json({ error: "Failed to update teacher" });
  }
});

// Delete teacher by ID
app.delete("/teachers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request received to delete teacher. ID:", id);
    const data = await deleteTeacher(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error deleting teacher:", err);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
});

// ============== Student Routes ==============

// Get all students
app.get("/students", async (req, res) => {
  try {
    console.log("Request received to list students");
    const data = await readStudents();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error listing students:", err);
    res.status(500).json({ error: "Failed to list students" });
  }
});

// Get one student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request received to get Student Info for ID:", id);
    const data = await readStudentInfo(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error getting student info:", err);
    res.status(500).json({ error: "Failed to get student info" });
  }
});

// Add a new student
app.post("/students", async (req, res) => {
  try {
    const { id, name, age, hometown } = req.body;
    console.log("Request received to add student. Req body:", req.body);
    const data = await addStudent(id, name, age, hometown);
    res.status(201).json(data);
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Update student by ID
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, hometown } = req.body;
    console.log("Request received to update student. ID:", id, "Body:", req.body);
    const data = await updateStudent(name, age, hometown, id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Delete student by ID
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request received to delete student. ID:", id);
    const data = await deleteStudent(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = app;
