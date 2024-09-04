import express from "express";
import checkAuth from "../middleware/check-auth";

import userController from "../controllers/user";

const router = express.Router();

router.post("/login", userController.userLogin);

router
  .route("/")
  .post(userController.addUser)
  .get(checkAuth, userController.getAllUsers); //need to add check if admin back

export default router;
