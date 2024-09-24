import Db from "../db/db";
import Task from "../models/task";

import validator from "../validator/task";
import * as Response from "../helpers/response/response";

import moment from "moment";

class TaskData {
  static async addTask(req, res) {
    const taskData = { ...req.body };

    let taskTimestamp = moment(taskData.dueDate, "MM-DD-YYYY").unix();
    taskData.dueDate = taskTimestamp;

    try {
      const result = await validator.validateAsync(taskData);
      if (!result.error) {
        const TaskName = await Db.addTask(Task, taskData);
        return Response.responseOkCreated(res, TaskName);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async allTasks(req, res) {
    try {
      const allTasks = await Db.getAllTasks(Task);
      return Response.responseOk(res, allTasks);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getTaskById(req, res) {
    const { id } = req.params;
    try {
      const taskById = await Db.getTaskById(Task, id);
      return Response.responseOk(res, taskById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default TaskData;
