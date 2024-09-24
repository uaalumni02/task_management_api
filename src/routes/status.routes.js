import express from "express";
import checkAuth from "../middleware/check-auth";

import statusController from "../controllers/status";

const router = express.Router();

//-----need to add check auth ---- figure out how to work with the cookie

router
  .route("/")
  .post(checkAuth, statusController.addStatus)
  .get(checkAuth, statusController.allStatuses);

router.route("/:id").get(statusController.getStatusById);

export default router;
