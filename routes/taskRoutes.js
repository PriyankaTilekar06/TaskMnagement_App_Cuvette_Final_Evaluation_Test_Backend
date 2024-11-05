const express = require("express");
const cors = require("cors");
const router = express();

router.use(cors());
router.use(express.json());

router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.get("/api/tasks", (req, res) => {
  try {
    const tasks = [
      {
        id: 1,
        title: "Task 1",
        status: "backlog",
        priority: "LOW",
        dueDate: "2024-10-15",
        checklist: [],
      },
      {
        id: 2,
        title: "Task 2",
        status: "todo",
        priority: "HIGH",
        dueDate: "2024-10-22",
        checklist: [],
      },
      {
        id: 3,
        title: "Task 3",
        status: "inProgress",
        priority: "MODERATE",
        dueDate: "2024-10-18",
        checklist: [],
      },
      {
        id: 4,
        title: "Task 4",
        status: "done",
        priority: "LOW",
        dueDate: "2024-10-25",
        checklist: [],
      },
      {
        id: 5,
        title: "Task 5",
        status: "done",
        priority: "HIGH",
        dueDate: "2024-10-10",
        checklist: [],
      },
    ];
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token is required");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

router.post("/tasks", verifyToken, (req, res) => {
  const { title, dueDate, priority } = req.body;
  const user = req.user;

  if (user) {
    const newTask = { title, dueDate, priority, createdBy: user.email };
    res.status(201).json(newTask);
  } else {
    res.status(403).send("Unauthorized");
  }
});

module.exports = router;
