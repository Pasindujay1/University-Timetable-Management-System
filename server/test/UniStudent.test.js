import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';

const BASE_URL = "http://localhost:3000/api";
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

describe('UniStudent API', () => {
  it('should create a new student', async () => {
    const studentData = {
      name: 'John Doe',
      age: 20,
      email: 'john.doe@example.com',
      phone: '1234567890',
      FacultyId: 'validFacultyId',
    };
    const res = await server
      .request(BASE_URL)
      .post('/student')
      .set('Authorization', `Bearer ${authToken}`)
      .send(studentData);

    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('name', studentData.name);
    expect(res.body).to.have.property('age', studentData.age);
    expect(res.body).to.have.property('email', studentData.email);
    expect(res.body).to.have.property('phone', studentData.phone);
  });

  it('should return an error if age is invalid', async () => {
    const invalidData = {
      name: 'Invalid Student',
      age: -5,
      email: 'invalid@example.com',
      phone: '1234567890',
      FacultyId: 'validFacultyId',
    };

    const res = await server
      .request(BASE_URL)
      .post('/student')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Age must be a number and greater than 0');
  });

  it('should return an error if FacultyId is invalid', async () => {
    const invalidData = {
      name: 'Invalid Student',
      age: 25,
      email: 'invalid@example.com',
      phone: '1234567890',
      FacultyId: 'invalidFacultyId',
    };

    const res = await server
      .request(BASE_URL)
      .post('/student')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Faculty not found');
  });
});
