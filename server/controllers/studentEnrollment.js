import Course from "../models/Course.js";
import Timetable from "../models/Timetable.js";
import Enrollment from "../models/StudentEnrollment.js";
import nodemailer from "nodemailer";


const sendMail = async (email, password, studentEmailArray) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: email,
      pass: password,
    },
  });
  const mailOptions = {
    from: {
      name: "Course Coordinator",
      address: email,
    },
    to: studentEmailArray,
    text: "test message",
    html: "<b>Time Table has been Changed</b>",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
 
export const addStudentEnrollment = async (req, res) => {
  const { student, course, enrollmentKey } = req.body;

  if (!student || !course || !enrollmentKey) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const courseDetails = await Course.findById(course);
    console.log(courseDetails);
    if (!courseDetails) {
     
      return res.status(404).json({ error: "Course not found!" });
    }

    if (!courseDetails.status) {
      return res.status(400).json({ error: "Course is not active!" });
    }

    if (courseDetails.enrollmentKey !== enrollmentKey) {
      return res.status(400).json({ error: "Invalid enrollment key!" });
    }

    // const timetable = await Timetable.findOne({ course: courseDetails._id });
    // if (!timetable) {
    //   return res.status(404).json({ error: "Timetable not found!" });
    // }

    const enrollment = await Enrollment.findOne({ student, course });
    if (enrollment) {
      return res.status(400).json({ error: "Student already enrolled!" });
    }

    const joinedAt = new Date();

    const newEnrollment = new Enrollment({
      student,
      course,
      joinedAt,
      status: true,
    });

    const savedEnrollment = await newEnrollment.save();
   
 const studentArray = await Enrollment.find({ course: course }).populate({
      path: "student",
      select: "user",
      populate: {
        path: "user",
        select: "email",
      },
    });
 
    const emailArray = studentArray.map(
      (student) => student.student.user.email
    );
 
    await sendMail(process.env.EMAIL, process.env.PASS, emailArray);
 
    return res
      .status(201)
      .json( {savedEnrollment, message: "Enrolled Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all enrollments for a student
export const getStudentEnrollments = async (req, res) => {
  const student = req.params.student;

  try {
    const enrollments = await Enrollment.find({ student })
      .populate("UniStudent", "name")
      // .populate("Course", "courseName code");
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all enrollments for a course
export const getCourseEnrollments = async (req, res) => {
  const course = req.params.course;

  try {
    const enrollments = await Enrollment.find({ course })
      .populate("UniStudent", "name")
      .populate("course", "courseName code");
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name")
      .populate("Course", "name code");
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update all enrollments for a student
export const updateStudentEnrollments = async (req, res) => {
  const student = req.params.student;
  const { status } = req.body;

  try {
    await Enrollment.updateMany({ student }, { status });
    const updatedEnrollments = await Enrollment.find({ student, status });
    return res.status(200).json({
      enrollments: updatedEnrollments,
      message: "Updated Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// update all enrollments for a course
export const updateCourseEnrollments = async (req, res) => {
  const course = req.params.course;
  const { status } = req.body;

  try {
    await Enrollment.updateMany({ course }, { status });
    const updatedEnrollments = await Enrollment.find({ course, status });
    return res.status(200).json({
      enrollments: updatedEnrollments,
      message: "Updated Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// update enrollment by course and student
export const updateEnrollment = async (req, res) => {
  const student = req.params.student;
  const course = req.params.course;
  const { status } = req.body;

  try {
    const enrollment = await Enrollment.findOne({ student, course });
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found!" });
    }

    enrollment.status = status;

    const updatedEnrollment = await enrollment.save();
    return res.status(200).json(updatedEnrollment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete enrollment by course and student
export const deleteEnrollment = async (req, res) => {
  const student = req.params.student;
  const course = req.params.course;

  try {
    const enrollment = await Enrollment.findOne({
      student,
      course,
    });
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found!" });
    }

    const deletedEnrollment = await enrollment.delete();
    return res.status(200).json(deletedEnrollment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search enrollment by course and student
export const searchEnrollment = async (req, res) => {
  const student = req.params.student;
  const course = req.params.course;

  try {
    const enrollment = await Enrollment.findOne({
      student,
      course,
    });
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found!" });
    }
    return res.status(200).json(enrollment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUniTimetable = async (req, res) => {
  const student = req.params.student;
  const course = req.params.course;

  try {
    const enrollment = await Enrollment.findOne({ student, course })
      .populate("course", "courseName code")
      .populate("student", "name");

    if (!enrollment) {
      return res
        .status(404)
        .json({ error: "Student is not enrolled in the course yet!" });
    }

    const timetable = await Timetable.findOne({
      course: enrollment.course._id,
    }).populate("course", "courseName code");

    return res.status(200).json(timetable);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
