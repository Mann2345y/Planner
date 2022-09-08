import express from "express";
import {
  authUser,
  createUser,
  removeUser,
  updateUser,
} from "../controllers/userController.js";
import { checkAuth } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/auth").post(authUser);
router.route("/create").post(createUser);
router.route("/:id").post(checkAuth, updateUser).delete(checkAuth, removeUser);

export default router;
