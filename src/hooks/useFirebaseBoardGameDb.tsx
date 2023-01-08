import { useState } from "react";
//
import useToastErrorMessage from "./useToastErrorMessage";
import useToastSuccessMessage from "./useToastSuccessMessage";
// firebase
import useFirebaseAuth from "./useFirebaseAuth";
import { getDatabase } from "firebase/database";
import { handleDbError, handleDbSuccess } from "./utils";

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
  const createBoardGameHistory = async () => {
    setIsLoading(true);
    try {
      handleDbSuccess(
        "Successfully created game history.",
        toastSuccessMessageFn,
        setIsLoading,
        setIsError
      );
    } catch (error) {}
  };

  // read single board game win/loss obj

  // read all board games win/loss obj

  // update single board game history win/loss obj

  // delete single board game history win/loss obj

  return { isLoading, isError, createBoardGameHistory };
}
