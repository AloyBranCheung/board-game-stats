import React from "react";
import useFirebaseAuth from "./useFirebaseAuth";
import { getDatabase, ref, update, child, push, get } from "firebase/database";
// react-toastify
import useToastErrorMessage from "./useToastErrorMessage";
import useToastSuccessMessage from "./useToastSuccessMessage";
// types/validators
import { z } from "zod";
import { createNewUserSchema } from "src/validators/UserValidation";
import { CreateUserObj, UserList } from "src/@types/UserTypes";

// https://board-game-stats-3420c-default-rtdb.firebaseio.com/

export default function useFirebaseDb() {
  const { userProfile } = useFirebaseAuth();
  const database = getDatabase();
  const toastErrorMessage = useToastErrorMessage();
  const toastSuccessMessage = useToastSuccessMessage();

  const handleError = (error: any, message: string) => {
    console.error(error);
    toastErrorMessage(message);
  };

  // create a new user
  const createNewUser = async (name: string) => {
    try {
      // generate uuid
      const _id = await push(child(ref(database), "/users")).key!;

      const userObj: CreateUserObj = {};
      userObj[_id] = { name };
      // validation
      z.record(z.string().min(1), createNewUserSchema).parse(userObj);

      await update(ref(database, userProfile?.uid + "/users"), userObj);
      toastSuccessMessage("Succesfully created new user.");
    } catch (error) {
      handleError(error, "Something went wrong, check the logs.");
    }
  };

  // read all users
  const readAllUsers = async () => {
    try {
      const getUsers = await get(
        child(ref(database), userProfile?.uid + "/users")
      );
      const responseData = await getUsers.val();
      const listOfUsers: UserList = responseData.values();
      return listOfUsers;
    } catch (error) {
      handleError(error, "Something went wrong retrieving users");
    }
  };

  return { createNewUser, readAllUsers };
}
