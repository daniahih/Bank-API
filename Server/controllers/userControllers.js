const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");
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
const getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await Users.findOne({ passportID: req.params.id });
    if (!user) {
      res.status(404);
      console.log("no user found");
      throw new Error("user not found ");
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//@desc update User
//@route PUT /api/Users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  console.log("update user");
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

  res.status(200).send(updatedUser);
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
//@desc delete User
//@route Put /api/Users/:id
//@access public
const depositCash = async (req, res, next) => {
  try {
    const cash = req.body.cash;
    const user = await Users.findOne({ passportID: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("user", user);
    user.totalCash += parseInt(cash);
    console.log("cash", user.totalCash);
    const updatedUser = await user.save();

    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const updateCredit = async (req, res, next) => {
  try {
    const user = await Users.findOne({ passportID: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (req.body.credit >= 0) {
      user.totalCredit = req.body.credit;
      const updatedUser = await user.save();
      res.status(200).send(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};
const withdrawMoney = async (req, res, next) => {
  try {
    const user = await Users.findOne({ passportID: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const withdrawAmount = req.body.withdrawAmount;
    if (withdrawAmount <= user.totalCash + user.totalCredit) {
      if (withdrawAmount <= user.totalCash) {
        user.totalCash -= withdrawAmount;
      } else {
        user.totalCredit -= withdrawAmount;
        user.totalCash = 0;
      }
    }
    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
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
  updateCredit,
  withdrawMoney,
};
