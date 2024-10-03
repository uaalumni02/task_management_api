import express from "express";

import userController from "../controllers/user";

const router = express.Router();

router.route("/:resetToken").post(userController.updatePassword);

export default router;
