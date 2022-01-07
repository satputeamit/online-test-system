import {AddSubject} from "../models/Subject.model";
import {AddQuesAns} from "../models/QuesAns.model";


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



export { validateAddSubject,validateAddQuesAns,validateAddExam };
