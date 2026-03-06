const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Akash" },
  { id: 2, name: "Alex" }
];

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "user-service"
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: name.trim()
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});