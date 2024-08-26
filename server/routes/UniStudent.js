
import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/UniStudent.js";
import authenticateToken from "../middleware/auth.js";


const router = express.Router();


router.post("/student", authenticateToken, createStudent);
router.get("/students", authenticateToken, getStudents);
router.get("/student/:id", authenticateToken, getStudentById);
router.put("/student/:id", authenticateToken, updateStudentById);
router.delete("/student/:id", authenticateToken, deleteStudentById);

export default router;
