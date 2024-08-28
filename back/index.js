import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongodb from "./mongodb.js";
import "./models/userDetails.js";
import auth from "./auth.middleware.js";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefresh,
} from "./controllers/authController.js";
import {
  add_student,
  add_teacher,
  delete_students,
  delete_teachers,
  edit_student_get,
  edit_student_put,
  edit_teacher_get,
  edit_teacher_put,
  get_students,
  get_teachers,
} from "./controllers/crudController.js";

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "https://teacher-student-db.netlify.app", // Your actual frontend URL
  "http://localhost:3000", // Local development URL
];

// Use CORS middleware with options
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows cookies to be sent with requests
    preflightContinue: false,
    optionsSuccessStatus: 204, // Some legacy browsers choke on 204
  })
);

app.use(express.json());
// app.use(express.urlencoded());

mongodb();

app.listen(PORT, () => {
  console.log(`hello from port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: `successfully running on port  ${PORT}` });
});

//Authentication Protocols
app.post("/register", handleRegister);

app.post("/login", handleLogin);

app.post("/logout", handleLogout);

app.post("/refresh", handleRefresh);

//Add Student
app.post("/add_student", auth, add_student);

//Add Teacher
app.post("/add_teacher", auth, add_teacher);

//get single student
app.get("/teacher/edit/:id", auth, edit_teacher_get);

//Update Teacher
app.put("/teacher/edit/:id", auth, edit_teacher_put);

//get single student
app.get("/student/edit/:id", auth, edit_student_get);

//Update Student
app.put("/student/edit/:id", auth, edit_student_put);

//Delete Teacher
app.delete("/teacher/:id", auth, delete_teachers);

//Delete Student
app.delete("/student/:id", auth, delete_students);

//Get Students
app.get("/students", auth, get_students);

//Get Teachers
app.get("/teachers", auth, get_teachers);
