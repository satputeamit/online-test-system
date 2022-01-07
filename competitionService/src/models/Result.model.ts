import { result } from "lodash";
import mongoose from "mongoose";

export interface ResultInterface extends mongoose.Document {
  exam_id: string;
  candidate_id: string;
  result: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddResult {
  exam_id: string;
  candidate_id: string;
  result: string;
}

const ResultSchema = new mongoose.Schema(
  {
    exam_id: { type: String, required: true },
    candidate_id: { type: String, required: true },
    result: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model<ResultInterface>(
  "Result",
  ResultSchema
);
export default Result;
