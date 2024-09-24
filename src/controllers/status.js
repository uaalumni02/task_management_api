import Db from "../db/db";
import Status from "../models/status";

import validator from "../validator/status";
import * as Response from "../helpers/response/response";

class StatusData {
  static async addStatus(req, res) {
    const StatusData = { ...req.body };
    try {
      const result = await validator.validateAsync(StatusData);
      if (!result.error) {
        const StatusType = await Db.addStatus(Status, StatusData);
        return Response.responseOkCreated(res, StatusType);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async allStatuses(req, res) {
    try {
      const allStatuses = await Db.getAllStatuses(Status);
      return Response.responseOk(res, allStatuses);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getStatusById(req, res) {
    const { id } = req.params;
    try {
      const statusById = await Db.getStatusById(Status, id);
      return Response.responseOk(res, statusById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default StatusData;
