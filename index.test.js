const request = require("supertest");
const app = require("./index");

describe("API Tests", () => {
  it("GET / - should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the Learnaware API with Jenkins!");
  });

  it("GET /api/users - should return a list of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ]);
  });

  it("POST /api/users - should create a new user", async () => {
    const newUser = { name: "Alice" };
    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Alice");
  });

  it("POST /api/users - should return 400 for missing name", async () => {
    const response = await request(app).post("/api/users").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Name is required");
  });
});
