// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import { useQuery } from "@tanstack/react-query";
import keystore from "./keystore";

export default function useReadAllBoardGameHistory() {
  const { readAllBoardGameHistory } = useFirebaseBoardGameDb();

  return useQuery({
    queryKey: keystore.boardGameHistoryKeys.readAllBoardGameHistory,
    queryFn: readAllBoardGameHistory,
  });
}
