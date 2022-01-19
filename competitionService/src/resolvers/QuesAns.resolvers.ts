import { validateAddQuesAns } from "../helper/validator";
import Exam, { ExamInterface } from "../models/ExamInfo.model";
import QuesAns, { QuesAnsInterface } from "../models/QuesAns.model";

const resolvers = {
  Query: {
    getQAData: async () => {
      const sub = await QuesAns.find();     
      return sub
    },
    getExamsQA: async(_: any, args: any)=>{
      const input = args.input;
      console.log("examids:",input.examId)
      const examData:any = await Exam.findOne({_id:input.examId})
      if(examData){
        const data = await QuesAns.find({_id: { $in: examData?.ques_ans_ids}})
        return data;
      }
      
      return [];

    }
  },
  Mutation: {
    createQuesAns: async (_: any, args: any) => {
      const input = args.input;
      const isValid = validateAddQuesAns(input);
      if (isValid) {
        return await QuesAns.create(input);
      }
      throw new Error("Invalid Request");
    },
  },

  QuesAns: {
    async __resolveReference(qa: QuesAnsInterface) {
      return QuesAns.findOne(qa.id);
    },
  },
};

export default resolvers;
