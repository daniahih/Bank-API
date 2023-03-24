const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  passport_id: {
    type: Number,
    required: [true, "Please add the passport id"],
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", UserSchema);
