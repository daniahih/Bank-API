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
  },
  {
    timetamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const schema = mongoose.Schema;

// const UserSchema = new schema({
//   passport_id: {
//     type: Number,
//     required: [true, "Please add the passport id"],
//   },
//   cash: {
//     type: Number,
//     default: 0,
//   },
//   credit: {
//     type: Number,
//     default: 0,
//   },
//   active: {
//     type: Boolean,
//     default: false,
//   },
// });

// module.exports = mongoose.model("User", UserSchema);
