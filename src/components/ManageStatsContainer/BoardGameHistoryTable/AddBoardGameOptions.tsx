import React from "react";
// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-forms
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "src/components/UI/form-components/Input";
// components
import AlertDialog from "src/components/UI/AlertDialog";
import LoadingSpinner from "src/components/UI/LoadingSpinner";
// types/validators
import { boardGameOptionSchema } from "src/validators/BoardGameHistoryValidation";

interface AddBoardGameOptionsProps {
  isAddBoardGameOption: boolean;
  setIsAddBoardGameOption: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddBoardGameOptions({
  isAddBoardGameOption,
  setIsAddBoardGameOption,
}: AddBoardGameOptionsProps) {
  // hooks
  const { createBoardGameOption, isLoading, isError } =
    useFirebaseBoardGameDb();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(boardGameOptionSchema),
    defaultValues: {
      boardGameName: "",
    },
  });

  // fns
  const handleAddBoardGameOption = async (
    data: z.infer<typeof boardGameOptionSchema>
  ) => {
    try {
      await createBoardGameOption(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog
      isOpen={isAddBoardGameOption}
      onClose={() => setIsAddBoardGameOption(false)}
      dialogTitle="Add New Board Game Option"
      onCancelButtonClick={() => setIsAddBoardGameOption(false)}
      cancelButtonText="Nah"
      acceptButtonText="Yah"
      acceptButtonType="submit"
      onSubmit={handleSubmit(handleAddBoardGameOption)}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Input
          control={control}
          label="Board Game Name"
          isError={
            typeof errors.boardGameName?.message === "string" ||
            (isError && true)
          }
          errorMessage={errors.boardGameName?.message}
          name="boardGameName"
        />
      )}
    </AlertDialog>
  );
}
