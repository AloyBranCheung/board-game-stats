import React, { useState } from "react";
import useFirebaseAuth from "./useFirebaseAuth";
import {
  getDatabase,
  ref,
  update,
  child,
  push,
  get,
  remove,
} from "firebase/database";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleError = (error: any, message: string) => {
    console.error(error);
    toastErrorMessage(message);
    setIsError(true);
  };

  const handleSuccess = () => {
    setIsLoading(false);
    setIsError(false);
  };

  // create a new user
  const createNewUser = async (name: string) => {
    setIsLoading(true);
    try {
      // generate uuid
      const _id = await push(child(ref(database), "/users")).key!;

      const userObj: CreateUserObj = {};
      userObj[_id] = { name, _id };

      // validation
      z.record(z.string().min(1), createNewUserSchema).parse(userObj);

      await update(ref(database, userProfile?.uid + "/users"), userObj);
      toastSuccessMessage("Succesfully created new user.");
      handleSuccess();
    } catch (error) {
      handleError(error, "Something went wrong, check the logs.");
    }
  };

  // read all users
  const readAllUsers = async () => {
    setIsLoading(true);
    try {
      const getUsers = await get(
        child(ref(database), userProfile?.uid + "/users")
      );
      const responseData = await getUsers.val();
      let listOfUsers: UserList = [];
      if (responseData) {
        listOfUsers = Object.values(responseData);
      }
      handleSuccess();
      return listOfUsers;
    } catch (error) {
      console.error(error);
      handleError(error, "Something went wrong retrieving users");
    }
  };

  // delete user
  const deleteSingleUser = async (userIdentifier: string) => {
    setIsLoading(true);
    try {
      await remove(
        child(ref(database), `${userProfile?.uid}/users/${userIdentifier}`)
      );
      handleSuccess();
    } catch (error) {
      console.error(error);
      handleError(error, "Something went wrong deleting user.");
    }
  };

  return { createNewUser, readAllUsers, deleteSingleUser, isLoading, isError };
}
