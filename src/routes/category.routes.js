import express from "express";
import checkAuth from "../middleware/check-auth";

import categoryController from "../controllers/category";

const router = express.Router();

//-----need to add check auth ---- figure out how to work with the cookie

router
  .route("/")
  .post(categoryController.addCategory) 
  .get(checkAuth, categoryController.allCategories);

router.route("/:id").get(categoryController.getCategoryById);

export default router;