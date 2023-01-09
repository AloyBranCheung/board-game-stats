// react-query
import { useQuery } from "@tanstack/react-query";
// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";

export default function useReadAllBoardGameOptions() {
  const { readAllBoardGameOptions } = useFirebaseBoardGameDb();
  return useQuery({
    queryKey: ["readAllBoardGameOptions"],
    queryFn: async () => {
      const response = await readAllBoardGameOptions();
      return response;
    },
  });
}
