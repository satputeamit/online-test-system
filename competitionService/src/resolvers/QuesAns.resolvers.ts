import { validateAddQuesAns } from "../helper/validator";
import QuesAns, { QuesAnsInterface } from "../models/QuesAns.model";

const resolvers = {
  Query: {
    getQAData: async () => {
      const sub = await QuesAns.find();     
      return sub
    },
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
