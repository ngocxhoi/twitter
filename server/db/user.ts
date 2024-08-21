import { prisma } from ".";
import bcrypt from "bcryptjs";
import { UserCreate } from "../types/interface";

export const createUser = (userData: UserCreate) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({
    data: finalUserData,
    omit: {
      password: true,
    },
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};

export const getUserById = (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
