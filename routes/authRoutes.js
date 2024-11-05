const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  getProfile,
  registerUser,
  loginUser,
} = require("../controllers/authControllers");
const userRoutes = require("../routes/userRoutes");

const authenticateUser = require("../middleware/authMiddleware");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

router.use(cors(corsOptions));
router.use(express.json());

router.get("/", test);
router.put("/test", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getProfile);
router.get("/", authenticateUser, userRoutes);

module.exports = router;
