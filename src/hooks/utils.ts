import React from "react";
// types/validators
import { fromZodError } from "zod-validation-error";

// eslint-disable-next-line no-unused-vars
type ToastMessage = (message: string) => void;

export const handleDbError = (
  error: any,
  message: string,
  // eslint-disable-next-line no-unused-vars
  toastErrorMessage: ToastMessage,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

export const handleDbSuccess = (
  successMessage: string,
  // eslint-disable-next-line no-unused-vars
  toastSuccessMessage: ToastMessage,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(false);
  setIsError(false);
  toastSuccessMessage(successMessage);
};
