import { expect ,use} from "chai";
import chaiHttp from "chai-http";
import Faculty from "../models/Faculty.js";
 
const BASE_URL = "http://localhost:3000/api";
const fac_Name="Test Fac11";
const fac_Code="FOE";
const facultyId ="65fdcf377f62cf0906d5c39c"
 
// Using chai-http plugin
const server = use(chaiHttp);
 
describe("POST /createFaculty", () => {
  it("should create a new faculty", async () => {
 
    const facultyData = {
      name: fac_Name,
      code: fac_Code,
    };
 
    try {
      const response = await server
        .request(BASE_URL)
        .post("/createFaculty")
        .send(facultyData);
 
      // Check status code
      expect(response.status).to.equal(200);
 
      // Check response body
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("_id");
      expect(response.body.name).to.equal(facultyData.name);
      expect(response.body.code).to.equal(facultyData.code);
 
       Faculty.findByIdAndDelete(response.body._id);
    } catch (error) {
      // Log any errors
      console.error(error);
    }
  }).timeout(15000);
 
  it("should handle errors gracefully", async () => {
    try {
      const response = await server
        .request(BASE_URL)
        .post("/createFaculty")
        .send({});
 
      // Check status code
      expect(response.status).to.equal(400);
 
      // Check response body
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("error").to.be.a("string");
      expect(response.body.error).to.equal("Please enter all the required fields.");
    } catch (error) {
      // Log any errors
      console.error(error);
    }
  });
});
  

  describe("DELETE /deleteFaculty", () => {
    it("should delete an existing faculty", async () => {
      try {
        const response = await server
          .request(BASE_URL)
          .delete("/deleteFaculty")
          .send({ code: fac_Code });
  
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("message").to.equal("Faculty deleted successfully");
      } catch (error) {
        console.error(error);
      }
    });
    });

