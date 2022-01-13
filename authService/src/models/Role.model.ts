import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export interface RoleInterface extends mongoose.Document {
  role: string;
  createdAt: Date;
  updatedAt: Date; 
}

export interface CreateRole { 
  role: string;
}

const RoleSchema = new mongoose.Schema(
  {
    role: { type: String, required: true }   
  },
  {
    timestamps: true,
  }
);

RoleSchema.pre("save", async function (next) {
  let role: any = this as RoleInterface; 
  role.role = (role.role).toLower();
  return next();
});

const Role = mongoose.model<RoleInterface>("Role", RoleSchema);
export default Role;
