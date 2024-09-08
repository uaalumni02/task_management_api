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
  static async addProject(model, data) {
    try {
      const newProject = await model({ ...data });
      return newProject.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllProjects(model) {
    try {
      const allProjects = await model.find({});
      return allProjects;
    } catch (error) {
      throw error;
    }
  }
  static async getProjectById(model, id) {
    try {
      const project = await model.findById(id);
      return project;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
