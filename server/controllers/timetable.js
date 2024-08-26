import LectureSession from "../models/LectureSession.js";
import Course from "../models/Course.js";
import Faculty from "../models/Faculty.js";
import Room from "../models/Room.js";
import Timetable from "../models/Timetable.js";



export const createTimeTable = async (req, res) => {
  const { courseCode } = req.body;

  if (!courseCode) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }

  try {
    const courseId = (await Course.findOne({ code: courseCode.toUpperCase() }))
      ?._id;
    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newTimetable = new Timetable({
      course: courseId,
      createdBy: req.user._id,
    });

    await newTimetable.save();
    res.status(201).json(newTimetable);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editTimetable = async (req, res) => {
  const { id } = req.params;
  const { courseCode } = req.body;

  if (!courseCode) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }

  try {
    const courseId = (await Course.findOne({ code: courseCode.toUpperCase() }))
      ?._id;
    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Timetable.updateOne({ _id: id }, { course: courseId });
    res.status(201).json({ message: "Timetable updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createLectureSession = async (req, res) => {
  const { dayOfTheWeek, startTime, endTime, roomCode, courseCode } = req.body;
  if (!dayOfTheWeek || !startTime || !endTime || !roomCode || !courseCode) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }
  if (
    !dayOfTheWeek
      .toLowerCase()
      .match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/)
  ) {
    return res.status(400).json({ message: "Invalid day of the week" });
  }
  try {
    const courseId = (await Course.findOne({ code: courseCode.toUpperCase() }))
      ?._id;
    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const roomId = (await Room.findOne({ room_code: roomCode }))?._id;
    if (!roomId) {
      return res.status(404).json({ message: "Room not found" });
    }

    const timetable = await Timetable.findOne({ course: courseId });
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    const newLectureSession = new LectureSession({
      startTime,
      endTime,
      room: roomId,
      dayOfTheWeek: dayOfTheWeek.toLowerCase(),
    });

    await newLectureSession.save();

    timetable.lectureSession.push(newLectureSession);
    await timetable.save();

    res.status(201).json(newLectureSession);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateLectureSession = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { startTime, endTime, roomCode, courseCode, dayOfTheWeek } = req.body;
  if (!startTime || !endTime || !roomCode || !dayOfTheWeek || !courseCode) {
    return res
      .status(400)
      .json({ message: "Please enter all the required fields" });
  }
  if (
    !dayOfTheWeek
      .toLowerCase()
      .match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/)
  ) {
    return res.status(400).json({ message: "Invalid day of the week" });
  }
  const courseId = (await Course.findOne({ code: courseCode.toUpperCase() }))
    ._id;

  try {
    if (!courseId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const roomId = (await Room.findOne({ room_code: roomCode }))._id;
    if (!roomId) {
      return res.status(404).json({ message: "Room not found" });
    }

    const updatedLectureSession = await LectureSession.findOneAndUpdate(
      { _id: id },
      {
        startTime,
        endTime,
        room: roomId,
        dayOfTheWeek: dayOfTheWeek.toLowerCase(),
      },
      { new: true }
    );
    if (!updatedLectureSession) {
      return res.status(404).json({ message: "Class session not found" });
    } else {
      res.status(201).json(updatedLectureSession);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteLectureSession = async (req, res) => {
  const { id } = req.params;
  try {
    await LectureSession.deleteOne({ _id: id });
    await Timetable.updateMany(
      {},
      { $pull: { lectureSessions: { $in: [id] } } },
      { multi: true }
    );
    res.status(201).json({ message: "Class session deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
