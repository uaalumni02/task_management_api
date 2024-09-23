import Db from "../db/db";
import Priority from "../models/priority";

import validator from "../validator/priority";
import * as Response from "../helpers/response/response";

class PriorityData {
  static async addPriority(req, res) {
    const PriorityData = { ...req.body };
    try {
      const result = await validator.validateAsync(PriorityData);
      if (!result.error) {
        const PriorityName = await Db.addPriority(Priority, PriorityData);
        return Response.responseOkCreated(res, PriorityName);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async allPriorities(req, res) {
    try {
      const allPriorities = await Db.getAllPriorities(Priority);
      return Response.responseOk(res, allPriorities);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getPriorityById(req, res) {
    const { id } = req.params;
    try {
      const priorityById = await Db.getPriorityById(Priority, id);
      return Response.responseOk(res, priorityById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default PriorityData;