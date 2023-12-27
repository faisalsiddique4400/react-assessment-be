import mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    password: String,
    email: { type: String, lowercase: true },
  },
  { timestamps: true }
);

User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 13);

  next();
});

const userModel = mongoose.model("user", User);

export default userModel;
