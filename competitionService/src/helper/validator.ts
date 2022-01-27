import { AddSubject } from "../models/Subject.model";
import { AddQuesAns } from "../models/QuesAns.model";
import { AddParticipant } from "../models/Participants.model";
import { AddResult } from "../models/Result.model";
import { AddCandidateExamStatus } from "../models/CandidateExamStatus.model";

const validateAddSubject = (args: AddSubject) => {
  console.log("Validation called");
  return true;
};

const validateAddQuesAns = (args: AddQuesAns) => {
  console.log("Validation called");
  return true;
};

const validateAddExam = (args: AddQuesAns) => {
  console.log("Validation called");
  return true;
};

const validateAddParticipant = (args: AddParticipant) => {
  console.log("Validation called");
  return true;
};

const validateAddResult = (args: AddResult) => {
  console.log("Validation called");
  return true;
};

const validateCandidateExamStatus = (args: AddCandidateExamStatus) => {
  console.log("Validation called");
  return true;
};

export {
  validateAddSubject,
  validateAddQuesAns,
  validateAddExam,
  validateAddParticipant,
  validateAddResult,
  validateCandidateExamStatus,
};
