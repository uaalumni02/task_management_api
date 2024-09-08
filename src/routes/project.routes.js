import express from "express";
import checkAuth from "../middleware/check-auth";

import projectController from "../controllers/project";

const router = express.Router();

//-----need to add check auth ---- figure out how to work with the cookie

router
  .route("/")
  .post(projectController.addProject) 
  .get(checkAuth,projectController.allProjects);

router.route("/:id").get(projectController.getProjectById);

export default router;