const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },

    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
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
