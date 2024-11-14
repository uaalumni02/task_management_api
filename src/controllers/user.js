import Db from "../db/db";
import User from "../models/user";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";
import crypto from "crypto";
import moment from "moment";

import validator from "../validator/user";
import * as Response from "../helpers/response/response";

import sendHandler from "../helpers/email/mailer";

import Errors from "../helpers/constants/constants";

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

          token = Token.sign({ userName, userId, role });

          res.cookie("token", token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use true in production
            sameSite: "lax",
          });

          const userData = { userName, userId, role, token };

          // Sending the token in the response body along with userData
          return res
            .status(201)
            .json({ message: "User created successfully", userData });
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
          return Response.responseBadAuth(res, "Invalid username or password");
        }

        const isSamePassword = await bcrypt.comparePassword(
          password,
          user.password
        );
        if (!isSamePassword) {
          return Response.responseBadAuth(res, "Invalid username or password");
        }

        const token = Token.sign({
          userName: user.userName,
          userId: user._id,
        });

        // Set the token in the cookie
        res.cookie("token", token, {
          // httpOnly: true, // This ensures the cookie can't be accessed via JavaScript
          secure: process.env.NODE_ENV === "production", // Only secure in production
          sameSite: "lax", // Adjust sameSite based on your needs
        });

        // Optionally send the token in the response body
        return res.status(200).json({ token, user });
      } else {
        return Response.responseInvalidInput(res);
      }
    } catch (error) {
      console.error("Error during login:", error);
      return Response.responseServerError(res);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allUsers = await Db.getAllUsers(User);
      return Response.responseOk(res, allUsers);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }

  //look at reset url in handler helper------------------------------------link needs to redirect to frontend
  static async userPasswordReset(req, res) {
    const { email } = req.body;
    let reset_token = crypto.randomBytes(20).toString("hex");
    console.log(reset_token);
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
      console.log(error);
      return Response.responseServerError(res);
    }
  }
  static async updatePassword(req, res) {
    const { reset_token } = req.params;
    const { password } = req.body;
    try {
      const { error } = validator.validate(req.body);
      console.log(error);
      if (error) {
        return Response.responseInvalidConfirmation(res);
      }
      const userToReset = await Db.userResetStringToUpdate(User, reset_token);
      if (userToReset == null) {
        return Response.responseUserNotFound(res, Errors.INVALID_USER);
      }
      if (
        moment().diff(moment.unix(userToReset.currentTime), "minutes") <= 30
      ) {
        const hash = await bcrypt.hashPassword(password, 10);
        const updatedPassword = await Db.saveUpdatedPassword(
          User,
          userToReset._id,
          hash,
          userToReset.reset_token
        );
        if (req.params.resetToken == userToReset.reset_token) {
          return Response.responseOkUpdated(res);
        }
      }

      return Response.responseTokenExpired(res);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default UserData;
