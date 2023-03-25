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
  const { passportID, email, totalCash, totalCredit } = req.body;
  console.log(req.body);
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

  const updatedUser = await Users.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true }
  );

  res.status(200).json(updatedUser);
});

//@desc delete User
//@route DELETE /api/Users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findOneAndDelete({ passportID: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});
const depositCash = async (req, res, next) => {
  const passportId = req.params.passportID;
  const cash = req.body.cash;

  try {
    const user = await Users.findOne({ passportID: passportId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.totalCash += cash;
    await user.save();

    res.status(200).json({ message: "Cash deposited successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  depositCash,
};
