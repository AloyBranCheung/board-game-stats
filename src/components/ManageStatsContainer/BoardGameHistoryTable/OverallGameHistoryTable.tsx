import { useEffect, useState } from "react";
// firebase hook
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import useReadAllBoardGameHistory from "src/react-query/useReadAllBoardGameHistory";
import useReadAllBoardGameOptions from "src/react-query/useReadAllBoardGameOptions";
// toast-error-message
import useToastErrorMessage from "src/hooks/useToastErrorMessage";
// material react table
import MaterialReactTable from "material-react-table";
// table config
import { overallGameHistoryTableColumns } from "./config";
// mui
import { Box } from "@mui/material";
// components
import TableCRUDActions from "src/components/UI/Tables/TableCRUDActions";
import PrimaryButton from "src/components/UI/PrimaryButton";
import AddBoardGameOptions from "./AddBoardGameOptions";
import AddGameHistory from "./AddGameHistory";
import DeleteBoardGameOption from "./DeleteBoardGameOption";
// types/validators
import { BoardGameHistory } from "src/@types/BoardGameTypes";
import LoadingSpinner from "src/components/UI/LoadingSpinner";

export default function OverallGameHistoryTable() {
  // state
  const [users, setUsers] = useState<string[]>([]);
  const [isAddHistory, setIsAddHistory] = useState(false); // add history dialog
  const [isAddBoardGameOption, setIsAddBoardGameOption] = useState(false); // add board game dialog
  const [isDeleteBoardGameOptions, setIsDeleteBoardGameOptions] =
    useState(false); // delete board game option dialog
  const [boardGameOptions, setBoardGameOptions] = useState<string[]>([]);
  const [boardGameHistory, setBoardGameHistory] = useState<BoardGameHistory[]>(
    []
  );
  // hooks
  const { data: responseBoardGameOptions } = useReadAllBoardGameOptions();
  const toastErrorMessage = useToastErrorMessage();
  const { readAllUsers } = useFirebaseUserDb();
  const { data: responseBoardGameHistory, isLoading } =
    useReadAllBoardGameHistory();

  // useEffect
  useEffect(() => {
    (async function () {
      try {
        // board game options
        if (responseBoardGameOptions) {
          const bgOptions = await Object.keys(responseBoardGameOptions).map(
            (ele) => {
              const boardGame = responseBoardGameOptions[ele].boardGameName;
              return boardGame;
            }
          );
          setBoardGameOptions(bgOptions);
        }
        // board game history
        if (responseBoardGameHistory) {
          const bgHistory = await Object.keys(responseBoardGameHistory).map(
            (ele) => responseBoardGameHistory[ele]
          );
          setBoardGameHistory(bgHistory);
        }
        // user response
        const userResponse = await readAllUsers();
        const users = userResponse?.map((user) => user.name);
        setUsers(users as string[]);
      } catch (error) {
        console.error(error);
        toastErrorMessage("Error fetching users/board game options.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUsers, responseBoardGameOptions, responseBoardGameHistory]);

  // fns
  const handleRowEditSave = () => {
    console.log("row save");
  };

  const handleDeleteRow = () => {
    console.log("row delete");
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MaterialReactTable
            data={boardGameHistory}
            columns={overallGameHistoryTableColumns}
            enableEditing
            onEditingRowSave={handleRowEditSave}
            renderRowActions={({ row, table }) => (
              <TableCRUDActions
                row={row}
                table={table}
                handleDeleteRow={handleDeleteRow}
              />
            )}
            renderTopToolbarCustomActions={() => (
              <Box display="flex" gap="1.25rem">
                <PrimaryButton onClick={() => setIsAddHistory(true)}>
                  Add History
                </PrimaryButton>
                <PrimaryButton onClick={() => setIsAddBoardGameOption(true)}>
                  Add Board Game Option
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => setIsDeleteBoardGameOptions(true)}
                >
                  Delete Board Game Option
                </PrimaryButton>
              </Box>
            )}
          />

          <AddGameHistory
            isAddHistory={isAddHistory}
            setIsAddHistory={setIsAddHistory}
            users={users}
            boardGamesOptions={boardGameOptions}
          />

          <AddBoardGameOptions
            isAddBoardGameOption={isAddBoardGameOption}
            setIsAddBoardGameOption={setIsAddBoardGameOption}
          />

          <DeleteBoardGameOption
            isDeleteBoardGameOptions={isDeleteBoardGameOptions}
            setIsDeleteBoardGameOptions={setIsDeleteBoardGameOptions}
          />
        </>
      )}
    </>
  );
}
