import { useState } from "react";
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
import {
  createNewUserSubmitToDb,
  createNewUserSchema,
} from "src/validators/UserValidation";
import { CreateUserObj, UserList, UserObj } from "src/@types/UserTypes";
import { fromZodError } from "zod-validation-error";

// https://board-game-stats-3420c-default-rtdb.firebaseio.com/

export default function useFirebaseUserDb() {
  const { userProfile } = useFirebaseAuth();
  const database = getDatabase();
  const toastErrorMessage = useToastErrorMessage();
  const toastSuccessMessage = useToastSuccessMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDbError = (error: any, message: string) => {
    // if Zod error
    const validationError = fromZodError(error);
    if (validationError) {
      console.error(error);
      toastErrorMessage("Zod validation error.");
      setIsError(true);
      setIsLoading(false);
    } else {
      console.error(error);
      toastErrorMessage(message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleDbSuccess = () => {
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
      z.record(z.string().min(1), createNewUserSubmitToDb).parse(userObj);

      await update(ref(database, userProfile?.uid + "/users"), userObj);
      toastSuccessMessage("Succesfully created new user.");
      handleDbSuccess();
      return _id;
    } catch (error: any) {
      handleDbError(error, "Something went wrong, check the logs.");
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
        handleDbSuccess();
        return listOfUsers;
      }
    } catch (error) {
      console.error(error);
      handleDbError(error, "Something went wrong retrieving users");
    }
  };

  // read single user
  const readSingleUser = async (_id: string) => {
    setIsLoading(true);
    try {
      const getUsers = await get(
        child(ref(database), `${userProfile?.uid}/users/${_id}`)
      );
      const responseData = await getUsers.val();
      if (responseData) {
        return responseData;
      }
      handleDbSuccess();
    } catch (error) {
      console.error(error);
      handleDbError(error, "Something went wrong retrieving that user.");
    }
  };

  // update single user
  const updateSingleUser = async (_id: string, value: UserObj) => {
    setIsLoading(true);
    try {
      // validate
      createNewUserSchema.parse(value);
      await update(ref(database, `${userProfile?.uid}/users/${_id}`), value);
      handleDbSuccess();
    } catch (error) {
      handleDbError(error, "Something went wrong updating single user.");
    }
  };

  // delete user
  const deleteSingleUser = async (userIdentifier: string) => {
    setIsLoading(true);
    try {
      await remove(
        child(ref(database), `${userProfile?.uid}/users/${userIdentifier}`)
      );
      handleDbSuccess();
    } catch (error) {
      console.error(error);
      handleDbError(error, "Something went wrong deleting user.");
    }
  };

  return {
    createNewUser,
    readSingleUser,
    readAllUsers,
    updateSingleUser,
    deleteSingleUser,
    isLoading,
    isError,
  };
}
