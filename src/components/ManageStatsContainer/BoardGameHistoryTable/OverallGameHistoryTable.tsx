// material react table
import MaterialReactTable from "material-react-table";
import { overallGameHistoryTableColumns } from "./config";
// mock data
import { DUM_OVERALL_BOARD_GAME_HISTORY_DATA } from "src/mocks/overallBoardGameHistoryMockData";

export default function OverallGameHistoryTable() {
  return (
    <MaterialReactTable
      data={DUM_OVERALL_BOARD_GAME_HISTORY_DATA}
      columns={overallGameHistoryTableColumns}
    />
  );
}
