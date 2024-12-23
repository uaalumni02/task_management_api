import Db from "../db/db";
import Task from "../models/task";

import validator from "../validator/task";
import * as Response from "../helpers/response/response";

import moment from "moment";

class TaskData {
  static async addTask(req, res) {
    const taskData = { ...req.body };

    // Convert dueDate to a timestamp
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

  static async getTaskByUser(req, res) {
    const { userName } = req.params;
    try {
      const taskByUserName = await Db.getTaskByUserName(Task, userName);
      return Response.responseOk(res, taskByUserName);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }

  // New method: Get tasks by date and check if it's upcoming or past due
  static async getTaskByDate(req, res) {
    const { date } = req.params; // Expecting date in 'MM-DD-YYYY' format
    let taskDate = moment(date, "MM-DD-YYYY").startOf("day").unix();

    try {
      // Fetch tasks with the specified due date
      const tasks = await Db.getTasksByDate(Task, taskDate);

      if (tasks.length === 0) {
        return Response.responseNotFound(res, "No tasks found for this date.");
      }

      // Determine if the tasks are past due, upcoming, or due today
      const now = moment().startOf("day").unix();
      const responseData = tasks.map((task) => {
        let deadline;
        if (task.dueDate < now) {
          deadline = "Past Due";
        } else if (task.dueDate === now) {
          deadline = "Due Today";
        } else {
          deadline = "Upcoming";
        }

        return {
          task,
          deadline,
        };
      });

      return Response.responseOk(res, responseData);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async updateTask(req, res) {
    const taskId = req.params.id;
    const taskData = { ...req.body };

    // Convert dueDate to a timestamp
    let taskTimestamp = moment(taskData.dueDate, "MM-DD-YYYY").unix();
    taskData.dueDate = taskTimestamp;

    const { task, userName, dueDate, category, priority, status } = req.body;
    const updateTask = {
      task,
      userName,
      dueDate: taskTimestamp,
      category,
      priority,
      status,
    };
    try {
      const result = await validator.validateAsync(updateTask);
      if (!result.error) {
        const taskToUpdate = await Db.updateTaskData(
          Task,

          taskId,
          taskData
        );
        return Response.responseOk(res, taskToUpdate);
      }
    } catch (error) {
      console.log(error)
      return Response.responseServerError(res);
    }
  }
  static async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const taskToDelete = await Db.removeTask(Task, id);
      return Response.responseOk(res, taskToDelete);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default TaskData;
