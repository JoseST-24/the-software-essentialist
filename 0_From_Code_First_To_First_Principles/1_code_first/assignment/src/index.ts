// src/index.ts
import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import {
  createUser,
  editUser,
  getUserByEmail,
} from "./controllers/userController";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a new user
app.post("/users/new", createUser);

// Edit an existing user
app.post("/users/edit/:userId", editUser);

// Get user by email using getUserByEmail as middleware
app.get("/users", getUserByEmail);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
