import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose, { connect } from "mongoose";

const app = express();
const { log, error } = console;

const port = process.env.PORT || 3000;

const router = express.Router();

import taskByUserRoutes from "./routes/taskByUser.routes"
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import priorityRoutes from "./routes/priority.routes";
import taskRoutes from "./routes/task.routes";
import statusRoutes from "./routes/status.routes";
import userResetRoutes from "./routes/userReset.routes";
import updatePasswordRoutes from "./routes/updatePassword.routes";

// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3001', // Front-end origin
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const DB_URL = process.env.MONGO_URL;

try {
  mongoose.connect(DB_URL, { useNewUrlParser: true });
  console.log("Connection Successful");
} catch (err) {
  console.error("Unable to Connect to MongoDB", err);
}

router.use("/user", userRoutes);
router.use("/reset", userResetRoutes);
router.use("/updatePassword", updatePasswordRoutes);
router.use("/category", categoryRoutes);
router.use("/priority", priorityRoutes);
router.use("/task", taskRoutes);
router.use("/status", statusRoutes);
router.use("/task_by_user", taskByUserRoutes)

app.use("/api", router);

app.listen(port, () => log("server is running"));
export default app;
