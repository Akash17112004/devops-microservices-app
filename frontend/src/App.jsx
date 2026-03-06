import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function AnimatedNumber({ value, duration = 700 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    let animationFrame;
    const startTime = performance.now();
    const initialValue = startRef.current;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = Math.round(
        initialValue + (value - initialValue) * progress
      );

      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        startRef.current = value;
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{displayValue}</>;
}

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [userServiceHealth, setUserServiceHealth] = useState("Checking...");
  const [taskServiceHealth, setTaskServiceHealth] = useState("Checking...");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  const completedLikeTasks = useMemo(() => tasks.length, [tasks]);
  const onlineServices = useMemo(() => {
    let count = 0;
    if (userServiceHealth === "ok") count += 1;
    if (taskServiceHealth === "ok") count += 1;
    return count;
  }, [userServiceHealth, taskServiceHealth]);

  return (
    <div className="app-shell">
      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>

      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">⚙</div>
            <div>
              <h2>DevOps UI</h2>
              <p>Control Center</p>
            </div>
          </div>

          <nav className="nav-links">
            <button
              className={activeSection === "dashboard" ? "nav-item active" : "nav-item"}
              onClick={() => setActiveSection("dashboard")}
            >
              <span className="nav-icon">📊</span>
              Dashboard
            </button>

            <button
              className={activeSection === "users" ? "nav-item active" : "nav-item"}
              onClick={() => setActiveSection("users")}
            >
              <span className="nav-icon">👥</span>
              Users
            </button>

            <button
              className={activeSection === "tasks" ? "nav-item active" : "nav-item"}
              onClick={() => setActiveSection("tasks")}
            >
              <span className="nav-icon">🗂</span>
              Tasks
            </button>

            <button
              className={activeSection === "services" ? "nav-item active" : "nav-item"}
              onClick={() => setActiveSection("services")}
            >
              <span className="nav-icon">🩺</span>
              Services
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span>{theme === "dark" ? "🌙" : "☀"}</span>
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="container">
          <header className="hero">
            <div>
              <p className="eyebrow">DevOps Project Dashboard</p>
              <h1>Microservices Control Panel</h1>
              <p className="subtitle">
                React frontend connected to User Service and Task Service running on Kubernetes,
                observed with Grafana, and deployed through GitOps.
              </p>
            </div>
          </header>

          <section className="top-stats">
            <div className="stat-card">
              <div className="stat-head">
                <span className="stat-icon">👥</span>
                <span>Total Users</span>
              </div>
              <strong>
                <AnimatedNumber value={users.length} />
              </strong>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span className="stat-icon">🗂</span>
                <span>Total Tasks</span>
              </div>
              <strong>
                <AnimatedNumber value={tasks.length} />
              </strong>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span className="stat-icon">🟢</span>
                <span>Online Services</span>
              </div>
              <strong>
                <AnimatedNumber value={onlineServices} />
              </strong>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span className="stat-icon">✅</span>
                <span>Processed Tasks</span>
              </div>
              <strong>
                <AnimatedNumber value={completedLikeTasks} />
              </strong>
            </div>
          </section>

          {(activeSection === "dashboard" || activeSection === "services") && (
            <section className="status-section">
              <div className="status-card">
                <div className="status-top">
                  <span className="service-icon">👤</span>
                  <div>
                    <div className="status-label">User Service</div>
                    <small>Handles team member APIs</small>
                  </div>
                </div>
                <div className={`status-pill ${userServiceHealth === "ok" ? "online" : "offline"}`}>
                  <span className="dot"></span>
                  {userServiceHealth}
                </div>
              </div>

              <div className="status-card">
                <div className="status-top">
                  <span className="service-icon">📋</span>
                  <div>
                    <div className="status-label">Task Service</div>
                    <small>Handles task CRUD APIs</small>
                  </div>
                </div>
                <div className={`status-pill ${taskServiceHealth === "ok" ? "online" : "offline"}`}>
                  <span className="dot"></span>
                  {taskServiceHealth}
                </div>
              </div>
            </section>
          )}

          {(activeSection === "dashboard" || activeSection === "users" || activeSection === "tasks") && (
            <section className="main-grid">
              {(activeSection === "dashboard" || activeSection === "users") && (
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Team Members</h2>
                      <p>Add and manage users from the User Service</p>
                    </div>
                    <span className="panel-badge">👥 Users</span>
                  </div>

                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Enter user name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <button className="primary-btn" onClick={addUser}>
                      + Add User
                    </button>
                  </div>

                  <div className="list">
                    {users.length === 0 ? (
                      <div className="empty-state">No users added yet.</div>
                    ) : (
                      users.map((user) => (
                        <div className="list-item" key={user.id}>
                          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                          <div className="item-content">
                            <strong>{user.name}</strong>
                            <span>User ID: {user.id}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {(activeSection === "dashboard" || activeSection === "tasks") && (
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Tasks</h2>
                      <p>Create and manage tasks from the Task Service</p>
                    </div>
                    <span className="panel-badge">🗂 Tasks</span>
                  </div>

                  <div className="form-column">
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
                    <button className="primary-btn full-width" onClick={addTask}>
                      + Add Task
                    </button>
                  </div>

                  <div className="list">
                    {tasks.length === 0 ? (
                      <div className="empty-state">No tasks available.</div>
                    ) : (
                      tasks.map((task) => (
                        <div className="task-card" key={task.id}>
                          <div className="task-left">
                            <div className="task-icon">✓</div>
                            <div className="item-content">
                              <strong>{task.title}</strong>
                              <span>Assigned to: {task.assignedTo || "Unassigned"}</span>
                            </div>
                          </div>
                          <button className="danger-btn" onClick={() => deleteTask(task.id)}>
                            Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;