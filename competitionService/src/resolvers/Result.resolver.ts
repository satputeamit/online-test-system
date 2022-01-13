import { validateAddResult } from "../helper/validator";
import Result,{ResultInterface} from "../models/Result.model";

const resolvers = {
  Query: {
    getResults: async () => {
      const exam = await Result.find();     
      return exam
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
