import mongoose from "mongoose";

export interface ExamInterface extends mongoose.Document { 
  subjectid:string; 
  organizerid:string;
  duration_in_minutes: number;
  total_question: number;
  need_to_be_correct:number;
  valid_till_hrs:number;
  QuesAns_ids:string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AddExam {  
    subjectid:string; 
    organizerid:string;
    duration_in_minutes: number;
    total_question: number;
    need_to_be_correct:number;
    valid_till_hrs:number;
    ques_ans_ids:string[]; 
  }

const ExamSchema = new mongoose.Schema(
  {  
    subjectid: { type: String, required: true},   
    organizerid: { type: String, required: true},
    duration_in_minutes:{ type: Number, required: true},
    total_question: { type: Number, required: true},
    need_to_be_correct: { type: Number, required: true},
    valid_till_hrs: { type: Number, required: true},
    ques_ans_ids: { type: [String], required: true},

  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model<ExamInterface>("Exam", ExamSchema);
export default Exam;
