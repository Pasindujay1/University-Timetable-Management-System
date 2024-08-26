import Course from "../models/Course.js";
import Faculty from "../models/Faculty.js";

export const createCourse = async (req, res) => {
  const { name, code, description, credits, faculty,enrollmentKey,status } = req.body;

  if (!name || !code || !credits || !faculty || !enrollmentKey || !status) {
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });
  }
  if (isNaN(credits) || credits <= 0) {
    return res.status(400).json({ error: `Credits should be greater than 0` });
  }

  const newCode = code.toUpperCase();

  const facultyObject = await Faculty.findOne({ code: faculty });

  if (!facultyObject) {
    return res.status(400).json({
      error: `Faculty [${faculty}] does not exist in the system.`,
    });
  }

  const course = Course({
    name,
    code: newCode,
    description,
    credits,
    faculty: facultyObject._id,
    status,
    enrollmentKey
  });

  try {
    const savedCourse = await course.save();
    res.json(savedCourse);
  } catch (err) {
    res.status(400).json({ error: "Failed to create course" });
  }
};

export const getCourse = async (req, res) => {
  const { code } = req.body;
  try {
    const course = await Course.findOne({ code: code.toUpperCase() });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

export const editCourse = async (req, res) => {
  const { id, code, name, description, credits, faculty } = req.body;

  if (!code || !name || !description || !credits || !faculty) {
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });
  }
  if (isNaN(credits) || credits <= 0) {
    return res.status(400).json({ error: `Credits should be greater than 0` });
  }

  const newCode = code.toUpperCase();

  const facultyObject = Faculty.findOne({ code: faculty });

  if (!facultyObject) {
    return res.status(400).json({
      error: `Faculty [${facultyName}] does not exist in the system.`,
    });
  }

  try {
    const course = await Course.findOneAndUpdate(
      { _id: id },
      { code: newCode, name, description, credits, faculty: facultyObject._id },
      { new: true } // This option returns the updated document
    );

    if (!course) {
      return res.status(400).json({ error: `Failed to update course` });
    }

    return res.status(200).json({ course });
  } catch (err) {
    return res.status(500).json({ error: `Failed to update course` });
  }
};

export const deleteCourse = async (req, res) => {
  const { code } = req.body;

  try {
    const course = await Course.findOneAndDelete({ code: code.toUpperCase() });

    if (!course) {
      return res.status(400).json({ error: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete course" });
  }
};
