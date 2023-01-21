import { useMemo } from "react";
// container
import Overall from "src/components/Overall";
// queries
import useReadAllBoardGameHistory from "src/react-query/useReadAllBoardGameHistory";
// types
import { BoardGameHistoryDb } from "src/@types/BoardGameTypes";

export default function Home() {
  const { data, isLoading } = useReadAllBoardGameHistory();

  const boardGameHistoryData: BoardGameHistoryDb[] = useMemo(() => {
    return data && Object.values(data);
  }, [data]);

  return <Overall isLoading={isLoading} data={boardGameHistoryData || []} />;
}
