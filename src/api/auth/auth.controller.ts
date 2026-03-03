import { Request, Response } from "express";
import { prisma } from "../../prisma/prismaClient.js";
import { comparePassword, generateToken } from "../../utils/auth.util.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ status: 400, error: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, error: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.role, user.email);

    res.json({
      status: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Login failed" });
  }
};
