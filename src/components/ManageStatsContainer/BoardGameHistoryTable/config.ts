import { MRT_ColumnDef } from "material-react-table";
import { BoardGameHistory } from "src/@types/BoardGameTypes";

export const overallGameHistoryTableColumns: MRT_ColumnDef<BoardGameHistory>[] =
  [
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Board Game",
      accessorKey: "boardGame",
    },
    {
      header: "Winners",
      accessorKey: "winners",
    },
    {
      header: "Losers",
      accessorKey: "losers",
    },
    {
      header: "Comments",
      accessorKey: "comments",
    },
  ];
