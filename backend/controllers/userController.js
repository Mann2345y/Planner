import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../tokenGenerator.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, image, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exist!");
  } else {
    const createdUser = await User.create({
      name,
      email,
      password,
      image,
    });
    if (createdUser) {
      res.status(201).json({
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        image: createdUser.image,
        token: generateToken(createdUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
});
const removeUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    const userToDelete = await User.deleteOne({ _id: userExists._id });
    if (userToDelete) {
      res.status(201).json({
        message: "User Deleted",
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid User Id");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, image, password } = req.body;
  const loggedUser = await User.findById(userId);
  if (loggedUser) {
    loggedUser.name = name || loggedUser.name;
    loggedUser.email = email || loggedUser.email;
    loggedUser.image = image || loggedUser.image;
    loggedUser.password = password || loggedUser.password;
    const updatedUser = await loggedUser.save();
    res.status(201).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid User data !");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.matchPassword(password))) {
    res.status(200).json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      image: userFound.image,
      token: generateToken(userFound._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});

export { createUser, removeUser, updateUser, authUser };
