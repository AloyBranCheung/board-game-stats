// react-query
import { useQuery } from "@tanstack/react-query";
import boardGameOptionsKeys from "./keystore/addBoardGameOptionsKeyStore";
// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";

export default function useReadAllBoardGameOptions() {
  const { readAllBoardGameOptions } = useFirebaseBoardGameDb();
  return useQuery({
    queryKey: boardGameOptionsKeys.readAllBoardGameOptions,
    queryFn: async () => {
      const response = await readAllBoardGameOptions();
      return response;
    },
  });
}
