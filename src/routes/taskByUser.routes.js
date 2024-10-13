import express from "express";
import checkAuth from "../middleware/check-auth";
import taskController from "../controllers/task";

const router = express.Router();

router.route("/:userName").get(checkAuth, taskController.getTaskByUser);

export default router;
