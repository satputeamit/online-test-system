import mongoose from "mongoose";

export interface ParticipantInterface extends mongoose.Document { 
  exam_id:string;
  candidate_ids: string[];  
  createdAt: Date;
  updatedAt: Date;
}

export interface AddParticipant {  
    exam_id:string;
    candidate_ids: string[];   
  }

const ParticipantSchema = new mongoose.Schema(
  {  
    exam_id: { type: String, required: true },
    candidate_ids: { type: [String], required: true  }    
  },
  {
    timestamps: true,
  }
);

const Participant = mongoose.model<ParticipantInterface>("Participant", ParticipantSchema);
export default Participant;
