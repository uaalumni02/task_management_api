import Db from "../db/db";
import User from "../models/user";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";
import crypto from "crypto";

import validator from "../validator/user";
import * as Response from "../helpers/response/response";

import sendHandler from "../helpers/email/mailer";

class UserData {
  static async addUser(req, res) {
    const { userName, password } = req.body;
    try {
      const result = await validator.validateAsync(req.body);
      if (!result.error) {
        const user = await Db.findUser(User, userName);
        if (user != null) {
          return Response.responseConflict(res, user);
        } else {
          const hash = await bcrypt.hashPassword(password, 10);
          const newUser = { ...req.body, password: hash };
          const {
            userName,
            _id: userId,
            role,
          } = await Db.saveUser(User, newUser);
          let token = "";
          if (role === "standard" || role === "admin") {
            token = Token.sign({ userName, userId, role });
          }
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use true in production
            sameSite: "strict",
          });
          const userData = { userName, userId, role };
          return Response.responseOkUserCreated(res, userData);
        }
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

  static async userLogin(req, res) {
    const { userName, password } = req.body;
    try {
      const result = await validator.validateAsync(req.body);
      if (!result.error) {
        const user = await Db.findUser(User, userName);
        if (user == null) {
          return Response.responseBadAuth(res, user);
        }
        const isSamePassword = await bcrypt.comparePassword(
          password,
          user.password
        );
        if (isSamePassword) {
          const token = Token.sign({
            userName: user.userName,
            userId: user._id,
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use true in production
            sameSite: "strict",
          });
          const userData = { user };
          return Response.responseOk(res, userData);
        }
        return Response.responseBadAuth(res);
      } else {
        return Response.responseValidationError(res);
      }
    } catch (error) {
      console.log(error);
      return Response.responseServerError(res);
    }
  }

  static async getAllUsers(req, res) {
    try {
      console.log("Authenticated user:", req.user);
      const allUsers = await Db.getAllUsers(User);
      return Response.responseOk(res, allUsers);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }

  //look at reset url in handler helper
  static async userPasswordReset(req, res) {
    const { email } = req.body;
    let reset_token = crypto.randomBytes(20).toString("hex");
    try {
      const userToReset = await Db.findUserReset(User, email);
      if (userToReset == null) {
        return Response.responseEmailNotFound(res);
      }
      const reset = await Db.saveResetString(
        User,
        userToReset._id,
        reset_token,
        moment().unix()
      );
      sendHandler(reset_token);
      return Response.responseOkTokenCreated(res);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

}

export default UserData;
