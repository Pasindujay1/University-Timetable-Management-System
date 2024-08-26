import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
// import { BASE_URL } from '../constants/constants.js';
import { before } from 'mocha';
const BASE_URL="http://localhost:3000/api"
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
 
describe('newFacultyCreation function', () => {
  it('should create a new faculty', async () => {
    const facultyData = {
      code: 'FOQ1',
      name: 'Faculty of Qunatuty surveying1',
    };
    const res = await server
      .request(BASE_URL)
      .post('/createFaculty')
      .set('Authorization', `Bearer ${authToken}`)
      .send(facultyData);
  
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('name', facultyData.name);
    expect(res.body).to.have.property('code', facultyData.code.toUpperCase());
  });

  it('should return an error if credits are invalid', async () => {
    const invalidData = {
      ...courseData,
      credits: -3,
    };

    const res = await server
      .request(BASE_URL)
      .post('/createCourse')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Credits should be greater than 0');
  });

  it('should return an error if faculty does not exist', async () => {
    const invalidData = {
      ...courseData,
      faculty: 'INVALIDFACULTY',
    };

    const res = await server
      .request(BASE_URL)
      .post('/createCourse')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Faculty [INVALIDFACULTY] does not exist in the system.');
  });
 
});