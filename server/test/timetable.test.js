import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import Course from '../models/Course.js';
import Faculty from '../models/Faculty.js';
import Room from '../models/Room.js';
import Timetable from '../models/Timetable.js';

const BASE_URL = 'http://localhost:3000/api';
const server = use(chaiHttp);
use(chaiHttp);

let authToken;
let courseId;
let facultyId;
let roomId;

before('authenticate user', async () => {
  const userData = {
    email: 'admin@gmail.com',
    password: 'admin12345',
  };

  const authRes = await server
    .request(BASE_URL)
    .post('/login')
    .send(userData);

  authToken = authRes.body.jwtToken;
});

describe('Timetable Controller', () => {
  describe('createTimeTable', () => {
    beforeEach(async () => {
      // Create a course, faculty, and room for testing
      const faculty = new Faculty({ name: 'Test Faculty', code: 'TF' });
      const savedFaculty = await faculty.save();
      facultyId = savedFaculty._id;

      const course = new Course({
        name: 'Test Course',
        code: 'TC101',
        description: 'This is a test course',
        credits: 3,
        faculty: facultyId,
      });
      const savedCourse = await course.save();
      courseId = savedCourse._id;

      const room = new Room({ code: 'TR101', capacity: 50 });
      const savedRoom = await room.save();
      roomId = savedRoom._id;
    });

    afterEach(async () => {
      await Faculty.deleteMany({});
      await Course.deleteMany({});
      await Room.deleteMany({});
      await Timetable.deleteMany({});
    });

    it('should create a new timetable', async () => {
      const res = await server
        .request(BASE_URL)
        .post('/timetables/createTimetable')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ courseCode: 'TC101' });

      expect(res.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('course', courseId);
    });
  });

});