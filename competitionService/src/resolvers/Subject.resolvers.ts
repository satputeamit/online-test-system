import { validateAddSubject } from "../helper/validator";
import Subject, { SubjectInterface } from "../models/Subject.model";

const resolvers = {
  Query: {
    getSubjects: async () => {
      const sub = await Subject.find();
      return sub;
    },
  },
  Mutation: {
    addSubject: async (_: any, args: any) => {
      const input = args.input;
      const isValid = validateAddSubject(input);
      if (isValid) {
        return await Subject.create(input);
      }
      throw new Error("Invalid Request");
    },
  },

  Subject: {
    async __resolveReference(sub: SubjectInterface) {
      return Subject.findOne(sub.id);
    },
  },
};

export default resolvers;
