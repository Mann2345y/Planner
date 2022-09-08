import express from "express";
import {
  createPlan,
  deletePlan,
  getPlansOfUser,
  updatePlan,
} from "../controllers/plannerDataController.js";
import { checkAuth } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").get(checkAuth, getPlansOfUser).post(checkAuth, createPlan);
router.route("/:id").post(checkAuth, updatePlan).delete(checkAuth, deletePlan);

export default router;
