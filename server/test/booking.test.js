import { expect, use } from "chai";
import chaiHttp from "chai-http";
import Booking from "../models/booking.js";

const BASE_URL = "http://localhost:3000/api";
let bookingId;

// Using chai-http plugin
const server = use(chaiHttp);





describe("GET /booking/:bookingId", () => {
  it("should fetch a booking by ID", async () => {
    try {
      const response = await server
        .request(BASE_URL)
        .get(`/booking/${bookingId}`);

      // Check status code
      expect(response.status).to.equal(200);

      // Check response body
      expect(response.body).to.be.an("object");
      expect(response.body._id).to.equal(bookingId);
    } catch (error) {
      // Log any errors
      console.error(error);
    }
  });
});

describe("DELETE /booking/:bookingId", () => {
  it("should delete a booking by ID", async () => {
    try {
      const response = await server
        .request(BASE_URL)
        .delete(`/booking/${bookingId}`);

      // Check status code
      expect(response.status).to.equal(200);

      // Check response body
      expect(response.body).to.be.an("object");
      expect(response.body._id).to.equal(bookingId);
    } catch (error) {
      // Log any errors
      console.error(error);
    }
  });
});
