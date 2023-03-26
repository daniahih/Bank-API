const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  depositCash,
  updateCredit,
  withdrawMoney,
} = require("../controllers/userControllers");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:id/deposit").put(depositCash);
router.route("/:id/updateCredit").put(updateCredit);
router.route("/:id/withdrawMoney").put(withdrawMoney);

module.exports = router;
