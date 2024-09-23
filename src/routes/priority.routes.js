import express from "express";
import checkAuth from "../middleware/check-auth";

import priorityController from "../controllers/priority";

const router = express.Router();

//-----need to add check auth ---- figure out how to work with the cookie

router
  .route("/")
  .post(priorityController.addPriority) 
  .get(checkAuth, priorityController.allPriorities);

router.route("/:id").get(priorityController.getPriorityById);

export default router;