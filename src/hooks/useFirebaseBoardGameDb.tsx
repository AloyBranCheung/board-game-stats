import { useState } from "react";
// firebase
import useFirebaseAuth from "./useFirebaseAuth";
import { getDatabase } from "firebase/database";
// react-toastify
import useToastErrorMessage from "./useToastErrorMessage";
import useToastSuccessMessage from "./useToastSuccessMessage";
// types/validators
import { fromZodError } from "zod-validation-error";

export default function useFirebaseBoardGameDb() {
  const toastErrorMessage = useToastErrorMessage();
  const toastSuccessMessage = useToastSuccessMessage();
  const { userProfile } = useFirebaseAuth();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //
  const database = getDatabase();

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

  const handleDbSuccess = (successMessage: string) => {
    setIsLoading(false);
    setIsError(false);
    toastSuccessMessage(successMessage);
  };

  // create single board game win/loss

  // read all board games win/loss

  // read single board game win/loss

  // update single board game history win/loss

  // delete single board game history win/loss

  return { isLoading, isError };
}
