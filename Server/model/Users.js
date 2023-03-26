const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    passportID: {
      type: String,
      required: [true, "Please Insert your ID"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },

    totalCash: {
      type: Number,
      default: 0,
    },
    totalCredit: {
      type: Number,
      min: [0, "Total credit should be positive only"],
      default: 0,
    },
    // isActive: {
    //   type: Boolean,
    //   required: [true, "Please add the user account status"],
    // },
  },
  {
    timetamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
