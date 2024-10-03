class Db {
  static async findUser(model, userName) {
    try {
      const user = await model.findOne({ userName });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async saveUser(model, user) {
    try {
      const newUser = await model({ ...user });
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(model) {
    try {
      const allUsers = await model.find({});
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  static async addCategory(model, data) {
    try {
      const newCategory = await model({ ...data });
      return newCategory.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories(model) {
    try {
      const allCategories = await model.find({});
      return allCategories;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(model, id) {
    try {
      const project = await model.findById(id);
      return project;
    } catch (error) {
      throw error;
    }
  }

  static async addPriority(model, data) {
    try {
      const newPriority = await model({ ...data });
      return newPriority.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllPriorities(model) {
    try {
      const allPriorities = await model.find({});
      return allPriorities;
    } catch (error) {
      throw error;
    }
  }

  static async getPriorityById(model, id) {
    try {
      const priority = await model.findById(id);
      return priority;
    } catch (error) {
      throw error;
    }
  }

  static async addTask(model, data) {
    try {
      const newTask = await model({ ...data });
      return newTask.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllTasks(model) {
    try {
      const allTasks = await model
        .find({})
        .populate("userName category priority status");
      return allTasks;
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(model, id) {
    try {
      const task = await model
        .findById(id)
        .populate("userName category priority status");
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async addStatus(model, data) {
    try {
      const newStatus = await model({ ...data });
      return newStatus.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllStatuses(model) {
    try {
      const allStatuses = await model.find({});
      return allStatuses;
    } catch (error) {
      throw error;
    }
  }

  static async getStatusById(model, id) {
    try {
      const status = await model.findById(id);
      return status;
    } catch (error) {
      throw error;
    }
  }

  // New method: Get tasks by date
  static async getTasksByDate(model, taskDate) {
    try {
      const tasks = await model
        .find({ dueDate: taskDate })
        .populate("userName category priority status");
      return tasks;
    } catch (error) {
      throw error;
    }
  }
  static async updateTaskData(model, taskId, taskData) {
    try {
      const filter = { _id: taskId };
      const updatedTask = await model.findOneAndUpdate(filter, taskData, {
        new: true,
      });
      return updatedTask;
    } catch (error) {
      throw error;
    }
  }
  static async removeTask(model, id) {
    try {
      const deleteTask = await model.findOneAndDelete({ _id: id });
      return {};
    } catch (error) {
      throw error;
    }
  }
  static async findUserReset(model, email) {
    try {
      const user = await model.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async saveResetString(model, userToReset, reset_token, currentTime) {
    try {
      const filter = { _id: userToReset._id };
      const addResetString = await model.findOneAndUpdate(
        filter,
        { reset_token, currentTime },
        {
          new: true,
        }
      );
      return addResetString;
    } catch (error) {
      throw error;
    }
  }
  static async userResetStringToUpdate(model, reset_token) {
    try {
      const user = await model.findOne(reset_token);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async saveUpdatedPassword(model, userToReset, password, reset_token) {
    try {
      const filter = { _id: userToReset._id };
      const updatedPassword = await model.findOneAndUpdate(
        filter,
        { password, reset_token: null, currentTime: null },
        {
          new: true,
        }
      );
      return updatedPassword;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
