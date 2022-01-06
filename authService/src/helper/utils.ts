import { CreateUser } from "../models/User.models";

const validateCreateUser = (args: CreateUser) => {
  console.log("Validation called");
  return true;
};

export { validateCreateUser };
