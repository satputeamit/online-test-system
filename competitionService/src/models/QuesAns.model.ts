import mongoose from "mongoose";

export interface QuesAnsInterface extends mongoose.Document { 
  subjectid:string;
  question: string;
  answer: string;
  inputs:string[];
  outputs:string[];
  organizerid:string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddQuesAns {  
    subjectid:string;
    question: string;
    answer: string;
    inputs:string[];
    outputs:string[];
    organizerid:string;   
  }

const QuesAnsSchema = new mongoose.Schema(
  {  
    subjectid: { type: String, required: true },
    question: { type: String, required: true  },
    answer: { type: String},
    inputs: { type: [String], required: true },
    outputs: { type: [String], required: true },
    organizerid: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const QuesAns = mongoose.model<QuesAnsInterface>("QuesAns", QuesAnsSchema);
export default QuesAns;
