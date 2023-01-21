// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import { useQuery } from "@tanstack/react-query";
// import keystore from "./keystore";
import queryKeys from "./keystore";

export default function useReadAllBoardGameHistory() {
  const { readAllBoardGameHistory } = useFirebaseBoardGameDb();

  return useQuery({
    queryKey: queryKeys.boardGameHistory.readAllBoardGameHistory.queryKey,
    queryFn: readAllBoardGameHistory,
  });
}
