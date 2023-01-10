import { MRT_ColumnDef } from "material-react-table";
import { BoardGameHistoryDb } from "src/@types/BoardGameTypes";

export const overallGameHistoryTableColumns: MRT_ColumnDef<BoardGameHistoryDb>[] =
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
      header: "Winner",
      accessorKey: "winner",
    },
    {
      header: "Loser",
      accessorKey: "loser",
    },
    {
      header: "Comments",
      accessorKey: "comments",
    },
  ];
