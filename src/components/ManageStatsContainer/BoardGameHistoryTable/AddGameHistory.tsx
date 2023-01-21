import React from "react";

// react-query
import useAddBoardGameHistory from "src/react-query/useAddBoardGameHistory";
// mui components
import { MenuItem } from "@mui/material";
// react-forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "src/components/UI/form-components/Input";
import SelectReactForm from "src/components/UI/form-components/SelectReactForm";
// dayjs
import dayjs from "dayjs";
// types/validators
import { z } from "zod";
import { createNewBoardGameHistorySchema } from "src/validators/BoardGameHistoryValidation";
// components
import AlertDialog from "src/components/UI/AlertDialog";
import DatePicker from "src/components/UI/form-components/DatePicker";
import LoadingSpinner from "src/components/UI/LoadingSpinner";

interface AddGameHistoryProps {
  isAddHistory: boolean;
  setIsAddHistory: React.Dispatch<React.SetStateAction<boolean>>;
  users: string[];
  boardGamesOptions: string[];
}

export default function AddGameHistory({
  isAddHistory,
  setIsAddHistory,
  boardGamesOptions,
  users,
}: AddGameHistoryProps) {
  // hooks

  const { mutate, isLoading, isError } = useAddBoardGameHistory();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createNewBoardGameHistorySchema),
    defaultValues: {
      datePicked: dayjs(new Date()),
      boardGame: "",
      winner: "",
      loser: "",
      comments: "",
    },
  });

  // fns
  const handleAddHistory = async (
    data: z.infer<typeof createNewBoardGameHistorySchema>
  ) => {
    try {
      await mutate(data);
      setIsAddHistory(false);
      reset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  // menu items
  const userSelectionMenuItems = users?.map((user) => (
    <MenuItem key={user} value={user}>
      {user}
    </MenuItem>
  ));

  return (
    <AlertDialog
      isOpen={isAddHistory}
      onClose={() => setIsAddHistory(false)}
      dialogTitle="Add A New Record"
      onCancelButtonClick={() => setIsAddHistory(false)}
      cancelButtonText="Nah"
      acceptButtonText="Yah"
      acceptButtonType="submit"
      onSubmit={handleSubmit(handleAddHistory)}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <DatePicker
            name="datePicked"
            control={control}
            isError={typeof errors.datePicked?.message === "string"}
            errorMessage={
              typeof errors.datePicked?.message === "string"
                ? errors.datePicked?.message
                : undefined
            }
          />
          <SelectReactForm
            name="boardGame"
            control={control}
            label="Board Game"
            isError={typeof errors.boardGame?.message === "string"}
            errorMessage={
              typeof errors.boardGame?.message === "string"
                ? errors.boardGame?.message
                : undefined
            }
          >
            {boardGamesOptions?.map((boardGame) => (
              <MenuItem key={boardGame} value={boardGame}>
                {boardGame}
              </MenuItem>
            ))}
          </SelectReactForm>
          <SelectReactForm
            name="winner"
            control={control}
            label="Winner"
            isError={typeof errors.winner?.message === "string"}
            errorMessage={
              typeof errors.winner?.message === "string"
                ? errors.winner?.message
                : undefined
            }
          >
            {userSelectionMenuItems}
          </SelectReactForm>
          <SelectReactForm
            name="loser"
            control={control}
            label="Loser"
            isError={typeof errors.loser?.message === "string"}
            errorMessage={
              typeof errors.loser?.message === "string"
                ? errors.loser?.message
                : undefined
            }
          >
            {userSelectionMenuItems}
          </SelectReactForm>
          <Input
            name="comments"
            control={control}
            label="Comment?"
            isError={
              typeof errors.comments?.message === "string" || (isError && true)
            }
            errorMessage={errors.comments?.message}
          />
        </>
      )}
    </AlertDialog>
  );
}
