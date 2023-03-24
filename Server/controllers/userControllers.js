const asyncHandler = require("express-async-handler");
const Users = require("../model/Users");
//@desc Get all Users
//@route GET /api/Users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

//@desc create new User
//@route POST /api/Users
//@access public
const createUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { passportID, email, totalCash, totalCredit } = req.body;
  if (!passportID || !email || !totalCash || !totalCredit) {
    res.status(400);
    throw new Error("All feilds are required");
  }
  const user = await Users.create({
    passportID,
    email,
    totalCash,
    totalCredit,
  });
  res.status(200).json(user);
});

//@desc get User
//@route GET /api/Users/:id
//@access public
const getUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found ");
  }
  res.status(200).json(user);
});

//@desc update User
//@route PUT /api/Users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found ");
  }
  const UpdatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(UpdatedUser);
});

//@desc delete User
//@route DELETE /api/Users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found ");
  }
  await Users.remove();
  res.status(200).json(user);
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
