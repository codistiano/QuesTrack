import mongoose, { SchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    default: Date.now()
  },
  challenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt )
  }
  return next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model("User", userSchema);
