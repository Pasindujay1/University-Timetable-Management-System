// routes/faculty.js
import express from "express";
import {
  createFaculty,
  deleteFaculty,
  getFaculty,
  updateFaculty,
} from "../controllers/faculty.js";


const router = express.Router();

router.post("/createFaculty", createFaculty);
router.get("/getFaculty", getFaculty);
router.put("/editFaculty", updateFaculty);
router.delete("/deleteFaculty", deleteFaculty);

export default router;
