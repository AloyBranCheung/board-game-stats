// react-query
import { useQuery } from "@tanstack/react-query";
import queryKeys from "./keystore";
// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";

export default function useReadAllBoardGameOptions() {
  const { readAllBoardGameOptions } = useFirebaseBoardGameDb();
  return useQuery({
    queryKey: queryKeys.boardGameOptions.readAllBoardGameOptions.queryKey,
    queryFn: async () => {
      const response = await readAllBoardGameOptions();
      return response;
    },
  });
}
