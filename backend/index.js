const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: 'https://mern-stack-todo-list-nine.vercel.app', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],// Allowed HTTP methods
   allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies and credentials
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mern-stack-todo-list-nine.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true") ; // Allow credentials (cookies, authorization headers, etc.)
  next();
});

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
