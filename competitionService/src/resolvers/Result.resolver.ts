import Exam from "../models/ExamInfo.model";
import Result, { ResultInterface } from "../models/Result.model";
import Subject from "../models/Subject.model";

const resolvers = {
  Query: {
    getResults: async () => {

      const exam = await Result.find();
      return exam
    },
    getResult: async (_: any, args: any) => {
      console.log("get Result called")
      const input = args.input;
      let totalCorrect = 0;
      let res_status = "Fail"
      const result = await Result.findOne({ exam_id: input.exam_id, candidate_id: input.candidate_id });
      console.log("result:",result)
      if (result) {

        for (let i = 0; i < result.question_status.length; i++) {
          totalCorrect += result.question_status[i].status
        }
        let examObj = await Exam.findOne({ _id: result.exam_id })

        if (examObj) {
          let subjectObj = await Subject.findOne({ _id: examObj?.subjectid })
          if (totalCorrect >= examObj?.need_to_be_correct) {
            res_status = "Pass"
          }

          return {
            subject: subjectObj?.name,
            result_status: res_status
          }
        }
      }
      return {
        subject: "test",
        result_status: ""
      }
    },
  },
  // Mutation: {
  //   addResult: async (_: any, args: any) => {
  //     const input = args.input;
  //     const isValid = validateAddResult(input);
  //     if (isValid) {
  //       return await Result.create(input);
  //     }
  //     throw new Error("Invalid Request");
  //   },
  // },

  Result: {
    async __resolveReference(pr: ResultInterface) {
      return Result.findOne(pr.id);
    },
  },
};

export default resolvers;
