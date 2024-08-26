import Student from "../models/UniStudent.js";
import User from "../models/User.js";
import Faculty from "../models/Faculty.js";

// create student
export const createStudent = async (req, res) => {
  const { name, age, email, phone, FacultyId } = req.body;

  // check if all fields are entered
  if (!name || !age || !email || !phone || !FacultyId) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }

  // check if age is a number and greater than 0
  if (isNaN(age) || age <= 0) {
    return res
      .status(400)
      .json({ message: "Age must be a number and greater than 0" });
  }

  // get the student's user id from the student's email
  const userId = (await User.findOne({ email: email }))?._id;

  // check if the user exists
  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }

  //check if the faculty exists
  if (!(await Faculty.findById(FacultyId))) {
    return res.status(404).json({ message: "Faculty not found" });
  }

  // create a new student
  const newStudent = new Student({
    name,
    age,
    email,
    phone,
    userId,
    FacultyId,
  });

  try {
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get student by id
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update student by id
export const updateStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete student by id
export const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndRemove(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
