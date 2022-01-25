import { result } from "lodash";
import mongoose from "mongoose";

export interface QuestionStatusInterface extends mongoose.Document{
  question_id: string;
  status: number;
}

export interface ResultInterface extends mongoose.Document {
  exam_id: string;
  candidate_id: string;
  question_status: QuestionStatusInterface[];
  result: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddResult {
  exam_id: string;
  candidate_id: string;
  question_Status: QuestionStatusInterface[];
  result: string;
}

const ResultSchema = new mongoose.Schema(
  {
    exam_id: { type: String, required: true },
    candidate_id: { type: String, required: true },
    question_status: [mongoose.Schema.Types.Mixed],
    result: { type: String},
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
