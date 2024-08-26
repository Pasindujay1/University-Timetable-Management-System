import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import { BASE_URL } from '../constants/constants.js'; 

const server = use(chaiHttp);

use(chaiHttp);

let authToken;

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

describe('addStudentEnrollment function', () => {
  it('should add a new student enrollment', async () => {
    const enrollmentData = {
      student: 'student_id_here',
      course: 'course_id_here',
      enrollmentKey: 'valid_enrollment_key_here',
    };
    const res = await server
      .request(BASE_URL)
      .post('/addStudentEnrollment')
      .set('Authorization', `Bearer ${authToken}`)
      .send(enrollmentData);

    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message', 'Enrolled Successfully!');
  });

  it('should return an error if required fields are missing', async () => {
    const invalidData = {
      // Missing required fields
    };

    const res = await server
      .request(BASE_URL)
      .post('/addStudentEnrollment')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'All fields are required!');
  });

  it('should return an error if enrollment key is invalid', async () => {
    const invalidData = {
      student: 'student_id_here',
      course: 'course_id_here',
      enrollmentKey: 'invalid_enrollment_key_here',
    };

    const res = await server
      .request(BASE_URL)
      .post('/addStudentEnrollment')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Invalid enrollment key!');
  });
});
