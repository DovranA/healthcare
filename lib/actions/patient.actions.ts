"use server";

import { CreateUserParams, RegisterUserParams } from "@/types";
import prisma from "../prisma.config";

// // CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const oldUser = await prisma.users.findFirst({
      where: { email: user.email, name: user.name, phone: user.phone },
    });
    if (oldUser) {
      return oldUser;
    }
    const newuser = await prisma.users.create({ data: user });
    return newuser;
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
  }
};

// // GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// // REGISTER PATIENT
export const registerPatient = async (patient: RegisterUserParams) => {
  try {
    const { userId, ...other } = patient;
    const newPatient = await prisma.patient.create({
      data: { ...other, userId: userId },
    });
    return newPatient;
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// // GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await prisma.patient.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return patients[0];
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
