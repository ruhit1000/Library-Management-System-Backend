import type { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUserToDB(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: unknown) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
      error: error,
    });
  }
};

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserToDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error,
      error: error,
    });
  }
};

export const authController = {
  registerUser,
  loginUser,
};
