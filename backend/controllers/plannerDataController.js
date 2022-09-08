import asyncHandler from "express-async-handler";
import PlannerData from "../models/PlannerData.js";

export const createPlan = asyncHandler(async (req, res) => {
  const { typeOfData, title, content, isStarred, sendRemind, creator, date } =
    req.body;
  const newPlanner = await PlannerData.create({
    typeOfData,
    title,
    content,
    isStarred,
    sendRemind,
    creator,
    date,
  });
  const plans = await PlannerData.find({ creator: creator });
  if (newPlanner) {
    res.status(201).json(plans);
  } else {
    res.status(401).json({ message: "Invalid User Data" });
  }
});
export const getPlansOfUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userPlans = await PlannerData.find({ creator: userId });
  if (userPlans) {
    res.status(201).json(userPlans);
  } else {
    res.status(401).json({ message: "Invalid User Id" });
  }
});
export const updatePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;
  const { title, content, isStarred, sendRemind } = req.body;
  const plan = await PlannerData.findById(planId);
  if (plan) {
    plan.title = title || plan.title;
    plan.content = content || plan.content;
    plan.isStarred = isStarred || plan.isStarred;
    plan.sendRemind = sendRemind || plan.sendRemind;
    await plan.save();
    const plans = await PlannerData.find({ creator: plan.creator });
    res.status(201).json(plans);
  } else {
    res.status(401).json({ message: "Plan not found" });
  }
});
export const deletePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;
  const planToDelete = await PlannerData.findById(planId);
  const deletedPlan = await PlannerData.deleteOne({ _id: planId });
  const plans = await PlannerData.find({ creator: planToDelete.creator });
  if (deletedPlan) {
    res.status(201).json(plans);
  } else {
    res.status(401).json({ message: "Invalid Plan Id" });
  }
});
