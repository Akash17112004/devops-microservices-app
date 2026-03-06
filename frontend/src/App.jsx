import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [userServiceHealth, setUserServiceHealth] = useState("Checking...");
  const [taskServiceHealth, setTaskServiceHealth] = useState("Checking...");

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:30001/users");
    const data = await response.json();
    setUsers(data);
  };

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:30002/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const fetchHealth = async () => {
    const userHealthResponse = await fetch("http://localhost:30001/health");
    const userHealthData = await userHealthResponse.json();
    setUserServiceHealth(userHealthData.status);

    const taskHealthResponse = await fetch("http://localhost:30002/health");
    const taskHealthData = await taskHealthResponse.json();
    setTaskServiceHealth(taskHealthData.status);
  };

  const addUser = async () => {
    if (!userName.trim()) return;

    await fetch("http://localhost:30001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: userName })
    });

    setUserName("");
    fetchUsers();
  };

  const addTask = async () => {
    if (!taskTitle.trim()) return;

    await fetch("http://localhost:30002/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: taskTitle,
        assignedTo
      })
    });

    setTaskTitle("");
    setAssignedTo("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:30002/tasks/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
    fetchHealth();
  }, []);

  return (
    <div className="container">
      <h1>DevOps Microservices Dashboard</h1>

      <div className="status-bar">
        <p>User Service: {userServiceHealth}</p>
        <p>Task Service: {taskServiceHealth}</p>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Users</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={addUser}>Add User</button>
          </div>

          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Tasks</h2>
          <div className="input-group column">
            <input
              type="text"
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Assign to"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div>
                  <strong>{task.title}</strong>
                  <p>Assigned to: {task.assignedTo}</p>
                </div>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;