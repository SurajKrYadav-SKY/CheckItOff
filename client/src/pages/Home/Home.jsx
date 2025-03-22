// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../store/authSlice";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/auth");
//   };

//   if (!isAuthenticated) {
//     return <Navigate to="/auth" />;
//   }

//   return (
//     <div>
//       <h1>Welcome, {user?.name}!</h1>
//       <p>Email: {user?.email}</p>
//       <button onClick={handleLogout}>Logout</button>
//       <div>This page is for home</div>
//     </div>
//   );
// };

// export default Home;

// pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import {
  fetchTasks,
  addTask,
  toggleTask,
  removeTask,
} from "../../store/taskSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import "./Home.scss";

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  // Fetch tasks on mount and ensure it runs after authentication
  useEffect(() => {
    if (isAuthenticated && status === "idle") {
      // Only fetch if idle
      dispatch(fetchTasks())
        .unwrap()
        .catch((err) => {
          toast.error("Failed to load tasks: " + err.message);
        });
    }
  }, [isAuthenticated, status, dispatch]);

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    dispatch(addTask(inputValue))
      .then(() => {
        setInputValue("");
        toast.success("Task added!");
      })
      .catch((err) => toast.error("Failed to add task: " + err.message));
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id)).catch((err) =>
      toast.error("Failed to toggle task: " + err.message)
    );
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id))
      .then(() => toast.success("Task deleted!"))
      .catch((err) => toast.error("Failed to delete task: " + err.message));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // e.g., "3/22/2025, 10:30:45 AM"
  };

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="input-container">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        {status === "loading" && <p>Loading tasks...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && tasks.length === 0 && <p>No tasks yet.</p>}
        {status === "succeeded" && tasks.length > 0 && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <div className="task-details">
                  <span className="task-text">{task.text}</span>
                  <span className="task-owner">by: {task.name}</span>
                  <span className="task-timestamp">
                    Added: {formatDateTime(task.createdAt)}
                  </span>
                </div>
                <button onClick={() => handleRemoveTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
