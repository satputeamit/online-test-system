import mongoose from "mongoose";
import { Url } from "url";

export interface UserProfileInterface extends mongoose.Document {
  user_id: string;
  first_name: string;
  last_name: string;
  mobile_number: number;
  profile_pic:string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserProfile{
    user_id: string;
    first_name: string;
    last_name: string;
    mobile_number: number;
    profile_pic:string;
}

const UserProfileSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    first_name : { type: String, required: true },
    last_name : { type: String, required: true },
    mobile_number: { type: Number },
    profile_pic : { type: String},
  },
  {
    timestamps: true,
  }
);



const UserProfile = mongoose.model<UserProfileInterface>("UserProfile", UserProfileSchema);
export default UserProfile;
