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
      console.log(error)
      return Response.responseServerError(res);
    }
  }
}

export default TaskData;

// complete remainder of files for this controller....add .populate-------------------
