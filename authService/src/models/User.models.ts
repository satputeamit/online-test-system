import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export interface UserInterface extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): any;
}

export interface CreateUser {
  email: string;
  password: string;
  role: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
    role: { type: String },
    permissions: { type: [String], required: true, default: "rw:own_account" },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  let user: any = this as UserInterface;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(
    parseInt(process.env.SALTWORKFACTOR || "10")
  );
  const hash = bcrypt.hashSync(user?.password, salt);
  console.log("pass",hash)
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserInterface;
  console.log(candidatePassword, user.password);

  // return candidatePassword === user.password;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;
