import User, { UserInterface } from "../models/User.models";
import UserProfile from "../models/UserProfile.model";
import dotenv from "dotenv";
import console from "console";
import { omit } from "lodash";

dotenv.config();

const resolvers = {
  Query: {
    usersProfile: async () => {
      const usr = await UserProfile.find();
      return usr;
    },
    getUserInfo: async (_: any, args: any, context: any)=>{
      const user = context.user;
      console.log("user:", user)
      const userprof = await UserProfile.findOne({ user_id: user.id });
      if(userprof){
        return userprof
      }

      var userData={
        user_id: user.id,
        first_name: user.username,
        last_name: "",
        mobile_number: null,
        profile_pic:""
      }

      return userData;
      
    }
  },

  Mutation: {
    createUserProfile: async (_: any, args: any, context: any) => {      
      const input = args.input;
      const user = context.user;
      if (user) {
        const userprof = await UserProfile.findOne({ user_id: user.id });
        if (userprof) {
          await UserProfile.updateOne(
            { user_id: user.id },
            input
          );
          const usrprofile = await UserProfile.findOne({ user_id: user.id });
          return usrprofile;
        }
        input.user_id = user.id       
        const usrprofile = await UserProfile.create(input);
        return usrprofile;
      }

      return context;
    },
  },

  User: {
    async __resolveReference(user: UserInterface) {
      return User.findOne(user.id);
    },
    async userprofile(user: UserInterface): Promise<typeof UserProfile> {
      const data: any = await UserProfile.findOne({ user_id: user._id });
      return data;
    },
  },
};

export default resolvers;
