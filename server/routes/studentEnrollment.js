
import express from "express";
import {
  addStudentEnrollment,
  getStudentEnrollments,
  getCourseEnrollments,
  getAllEnrollments,
  deleteEnrollment,
  searchEnrollment,
  getUniTimetable,
} from "../controllers/studentEnrollment.js";
import authenticateToken from "../middleware/auth.js";


const router = express.Router();


router.post("/addStudentEnrollment", authenticateToken, addStudentEnrollment);


router.get(
  "/getStudentEnrollments/:student",
  authenticateToken,
  getStudentEnrollments
);


router.get(
  "/getCourseEnrollments/:course",
  authenticateToken,
  getCourseEnrollments
);


router.get("/getAllEnrollments", authenticateToken, getAllEnrollments);


router.delete(
  "/deleteEnrollment/:course/:student",
  authenticateToken,
  deleteEnrollment
);


router.get(
  "/searchEnrollment/:course/:student",
  authenticateToken,
  searchEnrollment
);


router.get("/getUniTimetable", authenticateToken, getUniTimetable);

export default router;
