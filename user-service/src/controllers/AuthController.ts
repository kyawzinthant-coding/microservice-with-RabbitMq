import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../database";
import config from "../config/config";
import { IUser } from "../database";
import { ApiError, encryptPassword, isPasswordMatch } from "../utils";

const JWT_SECRET = config.JWT_SECRET as string;
const COOKIE_EXPIRES_Days = 90;
const expirationDate = new Date(
  Date.now() + COOKIE_EXPIRES_Days * 24 * 60 * 60 * 1000
);

const cookieOptions = {
  expires: expirationDate,
  secure: false,
  httpOnly: true,
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    const userData = await User.create({
      name,
      email,
      password: encryptPassword(password),
    });

    return res.json({
      status: 200,
      message: "User registered successfully",
      data: userData,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.messsge,
    });
  }
};

const createSendToken = async (user: IUser, res: Response) => {
  const { name, email, id } = user;
  const token = jwt.sign({ name, email, id }, JWT_SECRET, { expiresIn: "1d" });
  if (config.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  return token;
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await isPasswordMatch(password, user.password as string))) {
      throw new ApiError(400, "Incorrect email or password");
    }
    const token = await createSendToken(user, res);
    return res.json({
      status: 200,
      message: "User logged in successfully",
      token,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

export default { register, login };
