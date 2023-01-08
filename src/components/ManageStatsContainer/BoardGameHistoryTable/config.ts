import { MRT_ColumnDef } from "material-react-table";
import { BoardGameHistory } from "src/@types/BoardGameTypes";

export const overallGameHistoryTableColumns: MRT_ColumnDef<BoardGameHistory>[] =
  [
    {
      header: "Date",
      accessorKey: "datePicked",
    },
    {
      header: "Board Game",
      accessorKey: "boardGame",
    },
    {
      header: "Winner(s)",
      accessorKey: "winner",
    },
    {
      header: "Loser(s)",
      accessorKey: "loser",
    },
    {
      header: "Comments",
      accessorKey: "comments",
    },
  ];
