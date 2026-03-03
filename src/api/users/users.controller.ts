import { Request, Response } from "express";
import * as userService from "./users.service.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ status: 400, error: error.message });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await userService.getAllUsers(page, limit);
    res.json({
      status: 200,
      message: "Users retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id.toString());
    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: 400, error: "User not found or cannot be deleted" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUserRole(
      req.params.id.toString(),
      req.body.role,
    );
    res.json({
      status: 200,
      message: "User role updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ status: 400, error: "Invalid role or user ID" });
  }
};
