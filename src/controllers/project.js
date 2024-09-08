import Db from "../db/db";
import Project from "../models/project";

import validator from "../validator/project";
import * as Response from "../helpers/response/response";

class ProjectData {
  static async addProject(req, res) {
    const ProjectData = { ...req.body };
    try {
      const result = await validator.validateAsync(ProjectData);
      if (!result.error) {
        const ProjectName = await Db.addProject(Project, ProjectData);
        return Response.responseOkCreated(res, ProjectName);
      }
    } catch (error) {
      console.log(error)
      return Response.responseServerError(res);
    }
  }
  static async allProjects(req, res) {
    try {
      const allProjects = await Db.getAllProjects(Project);
      return Response.responseOk(res, allProjects);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getProjectById(req, res) {
    const { id } = req.params;
    try {
      const projectById = await Db.getProjectById(Project, id);
      return Response.responseOk(res, projectById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default ProjectData;
