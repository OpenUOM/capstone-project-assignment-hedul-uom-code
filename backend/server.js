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

// Use express built-in parsers instead of body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// ============== Teacher Related endpoints ==============

app.get("/listTeachers", async (req, res) => {
  try {
    console.log("Request received to list teachers");
    const data = await readTeachers();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error listing teachers:", err);
    res.status(500).json({ error: "Failed to list teachers" });
  }
});

app.post("/getTeacherInfo", async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Request received to get Teacher Info");
    const data = await readTeacherInfo(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error getting teacher info:", err);
    res.status(500).json({ error: "Failed to get teacher info" });
  }
});

app.post("/addTeacher", async (req, res) => {
  try {
    const { id, name, age } = req.body;
    console.log("Request received to add teacher. Req body:", req.body);
    const data = await addTeacher(id, name, age);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error adding teacher:", err);
    res.status(500).json({ error: "Failed to add teacher" });
  }
});

app.post("/editTeacher", async (req, res) => {
  try {
    const { name, age, id } = req.body;
    console.log("Request received to update teacher. Req body:", req.body);
    const data = await updateTeacher(name, age, id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error updating teacher:", err);
    res.status(500).json({ error: "Failed to update teacher" });
  }
});

app.post("/deleteTeacher", async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Request received to delete teacher. Req body:", req.body);
    const data = await deleteTeacher(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error deleting teacher:", err);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
});

// ============== Student Related endpoints ==============

app.get("/listStudents", async (req, res) => {
  try {
    console.log("Request received to list students");
    const data = await readStudents();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error listing students:", err);
    res.status(500).json({ error: "Failed to list students" });
  }
});

app.post("/getStudentInfo", async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Request received to get Student Info");
    const data = await readStudentInfo(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error getting student info:", err);
    res.status(500).json({ error: "Failed to get student info" });
  }
});

app.post("/addStudent", async (req, res) => {
  try {
    const { id, name, age, hometown } = req.body;
    console.log("Request received to add student. Req body:", req.body);
    const data = await addStudent(id, name, age, hometown);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.post("/editStudent", async (req, res) => {
  try {
    const { name, age, hometown, id } = req.body;
    console.log("Request received to update student. Req body:", req.body);
    const data = await updateStudent(name, age, hometown, id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Failed to update student" });
  }
});

app.post("/deleteStudent", async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Request received to delete student. Req body:", req.body);
    const data = await deleteStudent(id);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = app;
