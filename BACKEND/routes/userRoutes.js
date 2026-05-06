import express from "express";
import {
  createUser,
  getUsers,
  getUserByRegistration,
  verifyUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);

router.get("/verify", verifyUser);
router.get("/:reg", getUserByRegistration);

export default router;
