import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  editCourse,
} from "../controllers/course.js";
import { allowAdmin } from "../middleware/allowRole.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/createCourse", authenticateToken, allowAdmin, createCourse);
router.get("/getCourse", authenticateToken, allowAdmin, getCourse);
router.put("/editCourse", authenticateToken, allowAdmin, editCourse);
router.delete("/deleteCourse", authenticateToken, allowAdmin, deleteCourse);



export default router;
