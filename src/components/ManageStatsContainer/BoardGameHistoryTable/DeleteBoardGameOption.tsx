import React, { useState } from "react";
// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// mui
import { Box, Typography } from "@mui/material";
// components
import CrossIcon from "src/components/UI/Icons/CrossIcon";
import AlertDialog from "src/components/UI/AlertDialog";
// types/validators
import { BoardGameOption } from "src/@types/BoardGameTypes";

interface DeleteBoardGameOptionsProps {
  isDeleteBoardGameOptions: boolean;
  setIsDeleteBoardGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteBoardGameOptions({
  isDeleteBoardGameOptions,
  setIsDeleteBoardGameOptions,
}: DeleteBoardGameOptionsProps) {
  const { readAllBoardGameOptions, deleteBoardGameOption } =
    useFirebaseBoardGameDb();
  const [boardGameOptionsObj, setBoardGameOptionsObj] = useState(
    {} as BoardGameOption
  );
  const [boardGameOptions, setBoardGameOptions] = useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await readAllBoardGameOptions();
      if (response) {
        const keys = Object.keys(response);
        setBoardGameOptionsObj(response);
        setBoardGameOptions(keys);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBoardGameOptions, setBoardGameOptionsObj]);

  console.log(boardGameOptions);

  const optionsList = boardGameOptions.map((option) => {
    const bgOptionsObj = boardGameOptionsObj[option];

    return (
      <Box
        key={bgOptionsObj._id}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>{bgOptionsObj.boardGameName}</Typography>
        <CrossIcon
          onClick={() => {
            const objId = bgOptionsObj._id;
            deleteBoardGameOption(objId);
            setBoardGameOptions((prev) => prev.filter((ele) => ele !== objId));
            delete boardGameOptionsObj.objId;
            setBoardGameOptionsObj((prev) => prev);
          }}
        />
      </Box>
    );
  });

  return (
    <AlertDialog
      isOpen={isDeleteBoardGameOptions}
      onClose={() => setIsDeleteBoardGameOptions(false)}
      dialogTitle="Add A New Record"
      onCancelButtonClick={() => setIsDeleteBoardGameOptions(false)}
      cancelButtonText="Nah"
      acceptButtonText="Ok"
      onSubmit={() => setIsDeleteBoardGameOptions(false)}
    >
      <Box display="flex" flexDirection="column" gap="1.25rem">
        {optionsList.length > 0 ? optionsList : "None to display."}
      </Box>
    </AlertDialog>
  );
}
