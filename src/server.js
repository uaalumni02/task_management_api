import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose, { connect } from "mongoose";

const app = express();
const { log, error } = console;

const port = process.env.PORT || 3000;

const router = express.Router();

import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import priorityRoutes from "./routes/priority.routes";

app.use(cors());
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
router.use("/category", categoryRoutes);
router.use("/priority", priorityRoutes);

app.use("/api", router);

app.listen(port, () => log("server is running"));
export default app;
