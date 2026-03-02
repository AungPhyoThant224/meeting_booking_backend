import { prisma } from "../../prisma/prismaClient.js";
import { hashPassword } from "../../utils/auth.util.js";
import { Role } from "../../generated/prisma/enums.js";

export const createUser = async (data: any) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(data.password);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: { id: true, name: true, email: true, role: true },
  });
};

export const getAllUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      skip,
      take: limit,
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: "asc" },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    meta: {
      total,
      page,
      lastPage: Math.ceil(total / limit),
    },
  };
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return await prisma.user.delete({ where: { id } });
};

export const updateUserRole = async (id: string, role: Role) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, role: true },
  });
};
