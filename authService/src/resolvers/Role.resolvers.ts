import User, { UserInterface } from "../models/User.models";
import UserProfile from "../models/UserProfile.model";
import dotenv from "dotenv";
import console from "console";
import { omit } from "lodash";
import Role, { RoleInterface } from "../models/Role.model";

dotenv.config();

const resolvers = {
  Query: {
    getRoles: async () => {
      const rl = await Role.find();
      return rl;
    },
  },

  Mutation: {
    addRole: async (_: any, args: any, context: any) => {      
      const input = args.input;     
     
        const role = await UserProfile.findOne({ role: (input.role).toLower()});
        if (role) {          
          return role;
        }
               
        const newRole = await Role.create(input);
        return newRole; 
      
    },
  },

  Role: {
    async __resolveReference(role: RoleInterface) {
      return Role.findOne(role.id);
    }
  },
};

export default resolvers;
