import Db from "../db/db";
import Category from "../models/category";

import validator from "../validator/category";
import * as Response from "../helpers/response/response";

class CategoryData {
  static async addCategory(req, res) {
    const CategoryData = { ...req.body };
    try {
      const result = await validator.validateAsync(CategoryData);
      if (!result.error) {
        const CategoryName = await Db.addCategory(Category, CategoryData);
        return Response.responseOkCreated(res, CategoryName);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async allCategories(req, res) {
    try {
      const allCategories = await Db.getAllCategories(Category);
      return Response.responseOk(res, allCategories);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const categoryById = await Db.getCategoryById(Category, id);
      return Response.responseOk(res, categoryById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default CategoryData;
