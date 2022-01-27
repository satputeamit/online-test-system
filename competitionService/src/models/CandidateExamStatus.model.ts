import mongoose from "mongoose";

export interface CandidateExamStatusInterface extends mongoose.Document { 
  exam_id:string; 
  candidate_id:string;
  question_ids: string[];
  exam_status: string;  
  createdAt: Date;
  updatedAt: Date;
}

export interface AddCandidateExamStatus {  
    exam_id:string; 
    candidate_id:string;
    question_ids: string[];
    exam_status: string;  
  }

const CandidateExamStatusSchema = new mongoose.Schema(
  {  
    exam_id: { type: String, required: true},   
    candidate_id: { type: String, required: true},
    question_ids:{ type: [String], required: true},    
    exam_status: { type: String,  default:"PENDING"},    

  },
  {
    timestamps: true,
  }
);

const CandidateExamStatus = mongoose.model<CandidateExamStatusInterface>("CandidateExamStatus", CandidateExamStatusSchema);
export default CandidateExamStatus;
