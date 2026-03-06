const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Build frontend", assignedTo: "Akash" },
  { id: 2, title: "Build backend", assignedTo: "Alex" }
];

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "task-service"
  });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, assignedTo } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    assignedTo: assignedTo?.trim() || "Unassigned"
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Task Service running on http://localhost:${PORT}`);
});