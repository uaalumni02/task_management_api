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
        .populate("userName category priority");
      return allTasks;
    } catch (error) {
      throw error;
    }
  }
  static async getTaskById(model, id) {
    try {
      const task = await model
        .findById(id)
        .populate("userName category priority");
      return task;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
