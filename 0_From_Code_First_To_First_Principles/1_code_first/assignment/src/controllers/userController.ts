// src/controllers/userController.ts
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate a random password of a specified length
const generateRandomPassword = (length: number): string => {
  return randomBytes(length).toString("hex");
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    // Extract user data from the request body
    const { email, username, firstName, lastName } = req.body;

    // Generate a random password (e.g., 12 characters)
    const password = generateRandomPassword(12);

    // Create a new user record in the database with the random password
    const user = await prisma.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        password, // Assign the generated password
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit an existing user
export const editUser = async (req: Request, res: Response) => {
  try {
    // Extract user data and userId from the request parameters
    const userId = parseInt(req.params.userId, 10);
    const { email, username, firstName, lastName } = req.body;

    // Update the user record in the database
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        username,
        firstName,
        lastName,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch a user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    // Extract email from the query parameters
    const email = req.query.email as string;

    // Find the user by email in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
