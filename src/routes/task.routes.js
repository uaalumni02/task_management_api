import express from "express";
import checkAuth from "../middleware/check-auth";
import taskController from "../controllers/task";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, taskController.addTask)
  .get(checkAuth, taskController.allTasks);

router
  .route("/:id")
  .delete(checkAuth, taskController.deleteTask)
  .get(checkAuth, taskController.getTaskById)
  .patch(checkAuth, taskController.updateTask);

// New route to get tasks by date //localhost:3000/api/task/date/09-30-2024
router.route("/date/:date").get(checkAuth, taskController.getTaskByDate);

export default router;
