import express from "express";
import {
  createTimeTable,
  editTimetable,
  createLectureSession,
  updateLectureSession,
  deleteLectureSession,
} from "../controllers/timetable.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/createTimetable", authenticateToken, createTimeTable);
router.put("/editTimetable/:id", authenticateToken, editTimetable);
router.post("/createLectureSession", authenticateToken, createLectureSession);
router.put("/updateLectureSession/:id", authenticateToken, updateLectureSession);
router.delete("/deleteLectureSession/:id", authenticateToken, deleteLectureSession);

export default router;
