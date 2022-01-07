import { validateAddParticipant } from "../helper/validator";
import Participant, { ParticipantInterface } from "../models/Participants.model";

const resolvers = {
  Query: {
    getParticipants: async () => {
      const exam = await Participant.find();     
      return exam
    },
  },
  Mutation: {
    addParticipants: async (_: any, args: any) => {
      const input = args.input;
      const isValid = validateAddParticipant(input);
      if (isValid) {
        return await Participant.create(input);
      }
      throw new Error("Invalid Request");
    },
  },

  Participant: {
    async __resolveReference(pr: ParticipantInterface) {
      return Participant.findOne(pr.id);
    },
  },
};

export default resolvers;
