// next js server action file
"use server";

import { CreateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export const createUser = async (user: CreateUserParams) => {
  //type has all properties used in wwebhook
  try {
    //try to connect to db, actiosn will run only when we call them
    //serveless functions
    await connectToDatabase();
    //create user once conneted to the db
    const newUser = await User.create(user);
    //user is an object
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};
