import mongoose from "npm:mongoose@^6.7";
// var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mgrLevel: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    member: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hmember",
      },
      firstName: String,
      lastName: String,
    },
  },
  { timestamps: true }
);

// UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

export default User;
