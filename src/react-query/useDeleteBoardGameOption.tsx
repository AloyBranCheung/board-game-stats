// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "./keystore";

export default function useDeleteBoardGameOption() {
  const { deleteBoardGameOption } = useFirebaseBoardGameDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_id: string) => {
      const newData = await deleteBoardGameOption(_id);
      return newData;
    },
    onSuccess: (data) =>
      queryClient.setQueriesData(
        queryKeys.boardGameOptions.readAllBoardGameOptions.queryKey,
        data
      ),
  });
}
