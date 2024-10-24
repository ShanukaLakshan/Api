const request = require("supertest");
const { expect } = require("chai");
const app = require("../index");

describe("API Tests", () => {
  it("GET / - should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).to.equal(200);
    expect(response.text).to.equal(
      "Welcome to the Learnaware AI API!"
    );
  });

  it("GET /api/users - should return a list of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Shanuka Lakshan" },
    ]);
  });

  it("POST /api/users - should create a new user", async () => {
    const newUser = { name: "Alice" };
    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body.name).to.equal("Alice");
  });

  it("POST /api/users - should return 400 for missing name", async () => {
    const response = await request(app).post("/api/users").send({});
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("error", "Name is required");
  });
});
