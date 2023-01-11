import { useEffect, useState } from "react";
// react-query
import useUpdateBoardGameHistory from "src/react-query/useUpdateBoardGameHistory";
import useReadAllUsers from "src/react-query/useReadAllUsers";
import useDeleteBoardGameHistory from "src/react-query/useDeleteBoardGameHistory";
import useReadAllBoardGameHistory from "src/react-query/useReadAllBoardGameHistory";
import useReadAllBoardGameOptions from "src/react-query/useReadAllBoardGameOptions";
// toast-error-message
import useToastErrorMessage from "src/hooks/useToastErrorMessage";
// material react table
import MaterialReactTable, {
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
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
import LoadingSpinner from "src/components/UI/LoadingSpinner";
// types/validators
import { BoardGameHistoryDb } from "src/@types/BoardGameTypes";

export default function OverallGameHistoryTable() {
  // state
  const [users, setUsers] = useState<string[]>([]);
  const [isAddHistory, setIsAddHistory] = useState(false); // add history dialog
  const [isAddBoardGameOption, setIsAddBoardGameOption] = useState(false); // add board game dialog
  const [isDeleteBoardGameOptions, setIsDeleteBoardGameOptions] =
    useState(false); // delete board game option dialog
  const [boardGameOptions, setBoardGameOptions] = useState<string[]>([]);
  // hooks
  const toastErrorMessage = useToastErrorMessage();
  const { data: responseBoardGameOptions } = useReadAllBoardGameOptions();
  const { data: responseBoardGameHistory, isLoading } =
    useReadAllBoardGameHistory();
  const { data: responseReadAllUsers } = useReadAllUsers();
  const { mutate: deleteGameHistory } = useDeleteBoardGameHistory();
  const { mutate: updateGameHistory } = useUpdateBoardGameHistory();

  // useEffect
  useEffect(() => {
    (async function () {
      try {
        // board game options
        if (responseBoardGameOptions) {
          const fetchData = (await Object.values(responseBoardGameOptions)) as {
            _id: string;
            boardGameName: string;
          }[];
          const bgOptions = fetchData.map((obj) => obj.boardGameName);
          setBoardGameOptions(bgOptions);
        }
        // user response
        if (responseReadAllUsers) {
          const users = responseReadAllUsers?.map((user) => user.name);
          setUsers(users as string[]);
        }
      } catch (error) {
        console.error(error);
        toastErrorMessage("Error fetching users/board game options.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setUsers,
    responseBoardGameOptions,
    responseBoardGameHistory,
    responseReadAllUsers,
  ]);

  // fns
  const handleRowEditSave: MaterialReactTableProps<BoardGameHistoryDb>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      const _id = row.original._id.toString();
      await updateGameHistory({ _id, value: values });
      exitEditingMode();
    };

  const handleDeleteRow = async (row: MRT_Row<BoardGameHistoryDb>) => {
    await deleteGameHistory(row.original._id.toString());
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MaterialReactTable
            data={
              responseBoardGameHistory
                ? (Object.values(
                    responseBoardGameHistory
                  ) as BoardGameHistoryDb[])
                : []
            }
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
