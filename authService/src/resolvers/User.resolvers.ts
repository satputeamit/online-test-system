import User, { UserInterface, CreateUser } from "../models/User.models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validateCreateUser } from "../helper/utils";
import UserProfile, { UserProfileInterface } from "../models/UserProfile.model";

dotenv.config();

const resolvers = {
  Query: {
    users: async () => {
      const usr = await User.find().select(["-password"]);
      return usr;
    },
  },
  Mutation: {
    login: async (_: any, args: any) => {
      const { email, password } = args.input;     
      const user = await User.findOne({ email: email });
      if (await user?.comparePassword(password)) {
      // if (user && user.password === password) {
        const payload = {
          id: user?.id,
          username: user?.email,
          permissions: user?.permissions
        };
        const jwtScret = process.env.JWTSCRET || "";

        return jwt.sign(payload, jwtScret, {algorithm: "HS256", subject: user?.id, expiresIn: "5m" });
      }

      throw new Error("Invalid credentials");
    },

    createUser: async (_: any, args: any)=> {
      const input = args.input;
      console.log(input)
      const isValid = validateCreateUser(input)     
      if(isValid){
        const usr = await User.create(input);
        return usr;
      }
      throw new Error("Invalid Request");
    }
  },

  User: {
    async __resolveReference(user: UserInterface) {
      return  User.findOne(user.id);
    },
    // async userprofile(user:UserInterface): Promise<typeof UserProfile>{
    //   console.log("userpf :",user.id)
    //   const data:any = await UserProfile.findOne({"user_id":user._id})
    //   console.log("data :", data)
    //   return data
    // }

  },  
};

export default resolvers;
