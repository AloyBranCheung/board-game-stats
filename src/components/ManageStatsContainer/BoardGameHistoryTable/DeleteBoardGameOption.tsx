import React from "react";
// mui
import { Box, Typography } from "@mui/material";
// components
import CrossIcon from "src/components/UI/Icons/CrossIcon";
import AlertDialog from "src/components/UI/AlertDialog";
import LoadingSpinner from "src/components/UI/LoadingSpinner";
// react-query
import useReadAllBoardGameOptions from "src/react-query/useReadAllBoardGameOptions";
import useDeleteBoardGameOption from "src/react-query/useDeleteBoardGameOption";

interface DeleteBoardGameOptionsProps {
  isDeleteBoardGameOptions: boolean;
  setIsDeleteBoardGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteBoardGameOptions({
  isDeleteBoardGameOptions,
  setIsDeleteBoardGameOptions,
}: DeleteBoardGameOptionsProps) {
  const { data, isLoading } = useReadAllBoardGameOptions();
  const { mutate } = useDeleteBoardGameOption();

  const optionsList = Object.keys(data ? data : {}).map((option) => {
    const bgOptionsObj = data[option];

    return (
      <Box
        key={bgOptionsObj._id}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>{bgOptionsObj.boardGameName}</Typography>
        <CrossIcon onClick={async () => await mutate(bgOptionsObj._id)} />
      </Box>
    );
  });

  return (
    <AlertDialog
      isOpen={isDeleteBoardGameOptions}
      onClose={() => setIsDeleteBoardGameOptions(false)}
      dialogTitle="Add a New Board Game Option"
      onCancelButtonClick={() => setIsDeleteBoardGameOptions(false)}
      cancelButtonText="Nah"
      acceptButtonText="Ok"
      onSubmit={() => setIsDeleteBoardGameOptions(false)}
    >
      <Box display="flex" flexDirection="column" gap="1.25rem">
        {isLoading ? (
          <LoadingSpinner />
        ) : optionsList.length > 0 ? (
          optionsList
        ) : (
          "Try adding a new board game."
        )}
      </Box>
    </AlertDialog>
  );
}
