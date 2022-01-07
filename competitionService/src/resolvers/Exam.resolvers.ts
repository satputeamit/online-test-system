import { validateAddExam } from "../helper/validator";
import Exam, { ExamInterface } from "../models/ExamInfo.model";

const resolvers = {
  Query: {
    getExams: async () => {
      const exam = await Exam.find();     
      return exam
    },
  },
  Mutation: {
    createExam: async (_: any, args: any) => {
      const input = args.input;
      const isValid = validateAddExam(input);
      if (isValid) {
        return await Exam.create(input);
      }
      throw new Error("Invalid Request");
    },
  },

  Exam: {
    async __resolveReference(ex: ExamInterface) {
      return Exam.findOne(ex.id);
    },
  },
};

export default resolvers;
