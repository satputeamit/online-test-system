import mongoose from "mongoose";

export interface SubjectInterface extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddSubject {
    name: string;   
  }

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, uppercase: true },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model<SubjectInterface>("Subject", SubjectSchema);
export default Subject;
