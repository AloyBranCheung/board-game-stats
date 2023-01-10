import { useState } from "react";
// toast-hooks
import useToastErrorMessage from "./useToastErrorMessage";
import useToastSuccessMessage from "./useToastSuccessMessage";
// firebase
import useFirebaseAuth from "./useFirebaseAuth";
import {
  getDatabase,
  update,
  ref,
  get,
  set,
  child,
  push,
  remove,
} from "firebase/database";
import { handleDbError, handleDbSuccess } from "./utils";

// types/validators
import { z } from "zod";
import {
  createNewBoardGameHistorySchema,
  createNewBoardGameHistoryDbSchema,
  boardGameOptionSchema,
  boardGameOptionDbSchema,
} from "src/validators/BoardGameHistoryValidation";

export default function useFirebaseBoardGameDb() {
  const toastErrorMessageFn = useToastErrorMessage();
  const toastSuccessMessageFn = useToastSuccessMessage();
  const { userProfile } = useFirebaseAuth(); // userProfile.uid
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // basic config for CRUD actions
  const database = getDatabase();

  // create single board game win/loss obj
  const createBoardGameHistory = async (
    data: z.infer<typeof createNewBoardGameHistorySchema>
  ) => {
    setIsLoading(true);
    try {
      const directoryUrl = await `${userProfile?.uid}/boardGameHistory`;
      const _id = await push(child(ref(database), directoryUrl)).key;
      const dataToSubmit = {
        [_id!]: {
          _id,
          ...data,
          datePicked: data.datePicked.format("YYYY-MM-DD"),
        },
      };
      // data validation
      z.record(
        z.string().min(1, { message: "At least 1 character needed for _id." }),
        createNewBoardGameHistoryDbSchema
      ).parse(dataToSubmit);

      update(ref(database, directoryUrl), dataToSubmit);

      handleDbSuccess(
        "Successfully created game history.",
        toastSuccessMessageFn,
        setIsLoading,
        setIsError
      );
    } catch (error) {
      console.error(error);
      handleDbError(
        error,
        "Error adding game history.",
        toastErrorMessageFn,
        setIsError,
        setIsLoading
      );
    }
  };

  // create add board game option str
  const createBoardGameOption = async (
    boardGameName: z.infer<typeof boardGameOptionSchema>
  ) => {
    setIsLoading(true);
    const boardGameOptionsDestination =
      await `${userProfile?.uid}/boardGameOptions`;
    const dbRef = await ref(database, boardGameOptionsDestination);
    const newId = (await push(child(ref(database), boardGameOptionsDestination))
      .key) as string;
    const newBoardGameOptionForDb = {
      [newId]: { _id: newId, ...boardGameName },
    };

    try {
      //
      const getArrayBoardGameNames = await get(
        ref(database, boardGameOptionsDestination)
      );
      const boardGameNames = getArrayBoardGameNames.val();

      // data validation
      z.record(
        z.string().min(1, { message: "At least 1 character needed for _id." }),
        boardGameOptionDbSchema
      ).parse(newBoardGameOptionForDb);

      // POST to db
      if (boardGameNames === null) {
        await set(dbRef, newBoardGameOptionForDb);
      } else {
        await update(
          child(ref(database), boardGameOptionsDestination),
          newBoardGameOptionForDb
        );
      }

      handleDbSuccess(
        "Successfully added board game option.",
        toastSuccessMessageFn,
        setIsLoading,
        setIsError
      );

      const newReadAllBoardGameOptions = await readAllBoardGameOptions();
      return newReadAllBoardGameOptions;
    } catch (error) {
      console.error(error);
      handleDbError(
        error,
        "Error creating board game option.",
        toastErrorMessageFn,
        setIsError,
        setIsLoading
      );
    }
  };

  // read single board game win/loss obj

  // read all board games win/loss obj
  const readAllBoardGameHistory = async () => {
    setIsLoading(true);
    try {
      const fetchData = await get(
        child(ref(database), `${userProfile?.uid}/boardGameHistory`)
      );
      const boardGameHistory = fetchData.val();

      return boardGameHistory;
    } catch (error) {
      console.error(error);
      handleDbError(
        error,
        "Error getting board game history.",
        toastErrorMessageFn,
        setIsError,
        setIsLoading
      );
    }
  };

  // read all board game options
  const readAllBoardGameOptions = async () => {
    setIsLoading(true);
    try {
      const fetchData = await get(
        child(ref(database), `${userProfile?.uid}/boardGameOptions`)
      );
      const boardGameOptions = await fetchData.val();

      return boardGameOptions;
    } catch (error) {
      console.error(error);
      handleDbError(
        error,
        "Error getting all board game options.",
        toastErrorMessageFn,
        setIsError,
        setIsLoading
      );
    }
  };

  // update single board game history win/loss obj

  // delete single board game option
  const deleteBoardGameOption = async (_id: string) => {
    setIsLoading(true);
    try {
      await remove(
        child(ref(database), `${userProfile?.uid}/boardGameOptions/${_id}`)
      );
      handleDbSuccess(
        "Successfully removed board game option.",
        toastSuccessMessageFn,
        setIsError,
        setIsLoading
      );
      const newData = await readAllBoardGameOptions();
      return newData;
    } catch (error) {
      console.error(error);
      handleDbError(
        error,
        "Error deleting board game option.",
        toastErrorMessageFn,
        setIsError,
        setIsLoading
      );
    }
  };

  // delete single board game history win/loss obj

  return {
    isLoading,
    isError,
    createBoardGameHistory,
    createBoardGameOption,
    deleteBoardGameOption,
    readAllBoardGameOptions,
    readAllBoardGameHistory,
  };
}
