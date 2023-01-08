import { useEffect, useState } from "react";
// firebase hook
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// toast-error-message
import useToastErrorMessage from "src/hooks/useToastErrorMessage";
// material react table
import MaterialReactTable from "material-react-table";
// table config
import { overallGameHistoryTableColumns } from "./config";

// mock data
import { DUM_OVERALL_BOARD_GAME_HISTORY_DATA } from "src/mocks/overallBoardGameHistoryMockData";

// components
import TableCRUDActions from "src/components/UI/Tables/TableCRUDActions";
import PrimaryButton from "src/components/UI/PrimaryButton";
import AddBoardGameOptions from "./AddBoardGameOptions";
import AddGameHistory from "./AddGameHistory";

export default function OverallGameHistoryTable() {
  // state
  const [users, setUsers] = useState<string[]>([]);
  const [boardGamesOptions, setBoardGamesOptions] = useState<string[]>([]);
  const [isAddHistory, setIsAddHistory] = useState(false); // add history dialog
  const [isAddBoardGameOption, setIsAddBoardGameOption] = useState(false); // add board game dialog
  // hooks
  const toastErrorMessage = useToastErrorMessage();

  const { readAllUsers } = useFirebaseUserDb();

  // useEffect
  useEffect(() => {
    (async function () {
      try {
        // board game response
        setBoardGamesOptions(["testdefaultstate"]);
        // user response
        const userResponse = await readAllUsers();
        const users = userResponse?.map((user) => user.name);
        setUsers(users as string[]);
      } catch (error) {
        console.error(error);
        toastErrorMessage("Error fetching users.");
      }
    })();
  }, [readAllUsers, toastErrorMessage]);

  // fns
  const handleRowEditSave = () => {
    console.log("row save");
  };

  const handleDeleteRow = () => {
    console.log("row delete");
  };

  return (
    <>
      <MaterialReactTable
        data={DUM_OVERALL_BOARD_GAME_HISTORY_DATA}
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
          <>
            <PrimaryButton onClick={() => setIsAddHistory(true)}>
              Add History
            </PrimaryButton>
            <PrimaryButton onClick={() => setIsAddBoardGameOption(true)}>
              Add Board Game Option
            </PrimaryButton>
          </>
        )}
      />

      <AddGameHistory
        isAddHistory={isAddHistory}
        setIsAddHistory={setIsAddHistory}
        users={users}
        boardGamesOptions={boardGamesOptions}
      />

      <AddBoardGameOptions
        isAddBoardGameOption={isAddBoardGameOption}
        setIsAddBoardGameOption={setIsAddBoardGameOption}
      />
    </>
  );
}