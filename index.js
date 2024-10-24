const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Learnaware API with Jenkins!");
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];
  res.json(users);
});

app.post("/api/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: Date.now(),
    name: req.body.name,
  };
  res.status(201).json(newUser);
});

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
