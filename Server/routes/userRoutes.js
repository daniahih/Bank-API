const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  depositCash,
} = require("../controllers/userControllers");

router.route("/").get(getUsers).post(createUser);
router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)
  .post(depositCash);

module.exports = router;
