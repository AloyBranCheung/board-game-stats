import { useState } from "react";
// toast-hooks
import useToastErrorMessage from "./useToastErrorMessage";
import useToastSuccessMessage from "./useToastSuccessMessage";
// dayjs
import dayjs from "dayjs";
// firebase
import useFirebaseAuth from "./useFirebaseAuth";
import { getDatabase } from "firebase/database";
import { handleDbError, handleDbSuccess } from "./utils";
// types/validators
import { z } from "zod";
import { createNewBoardGameHistorySchema } from "src/validators/BoardGameHistoryValidation";

export default function useFirebaseBoardGameDb() {
  const toastErrorMessageFn = useToastErrorMessage();
  const toastSuccessMessageFn = useToastSuccessMessage();
  const { userProfile } = useFirebaseAuth(); // userProfile.uid
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // basic config for CRUD actions
  const database = getDatabase();
  const directoryUrl = userProfile ? `${userProfile.uid}/boardGameHistory` : "";

  // create single board game win/loss obj
  const createBoardGameHistory = async (
    data: z.infer<typeof createNewBoardGameHistorySchema>
  ) => {
    setIsLoading(true);
    const dataToSubmit = {
      ...data,
      datePicked: data.datePicked.format("YYYY-MM-DD"),
    };
    try {
      console.log("firebase", dataToSubmit);
      handleDbSuccess(
        "Successfully created game history.",
        toastSuccessMessageFn,
        setIsLoading,
        setIsError
      );
    } catch (error) {}
  };

  // create add board game option str
  const createBoardGameOption = async (boardGameName: string) => {
    setIsLoading(true);
    console.log("firebase", boardGameName);
  };

  // read single board game win/loss obj

  // read all board games win/loss obj

  // update single board game history win/loss obj

  // delete single board game history win/loss obj

  return { isLoading, isError, createBoardGameHistory, createBoardGameOption };
}
