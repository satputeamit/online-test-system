import { compareSync } from "bcrypt";
import { validateAddExam } from "../helper/validator";
import Exam, { ExamInterface } from "../models/ExamInfo.model";

const resolvers = {
  Query: {
    // getExams: async () => {
    //   const exam = await Exam.find();     
    //   return exam
    // },
    getExams: async () => {
      let resArray: any = []
      const exam = await Exam.find();
      const currentDateTime: any = new Date()
      for (let i = 0; i < exam.length; i++) {
        let _dtDiff = currentDateTime - <any>exam[i].createdAt;
        var hours = Math.abs(_dtDiff) / 36e5;       
        try{          
          if(!exam[i].isExpired){
            exam[i].isExpired = hours > exam[i].valid_till_hrs;         
            exam[i].save()
          }
         
        }catch(e:any){
          console.log(e)
        }                     
        resArray.push(exam[i])

      }
      // console.log("resArry:", resArray)
      return exam;

    }
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
