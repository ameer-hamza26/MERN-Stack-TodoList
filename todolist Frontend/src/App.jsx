import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        text: newTask,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List Web App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()} // Add this line
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTask(task._id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;