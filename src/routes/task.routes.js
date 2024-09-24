import express from "express";
import checkAuth from "../middleware/check-auth";

import taskController from "../controllers/task";

const router = express.Router();

//-----need to add check auth ---- figure out how to work with the cookie

router
  .route("/")
  .post(checkAuth, taskController.addTask)
  .get(checkAuth, taskController.allTasks);

router.route("/:id").get(taskController.getTaskById);

export default router;
