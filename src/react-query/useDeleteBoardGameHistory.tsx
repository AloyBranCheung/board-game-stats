// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keystore from "./keystore";

export default function useDeleteBoardGameHistory() {
  const { deleteBoardGameHistory } = useFirebaseBoardGameDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_id: string) => deleteBoardGameHistory(_id),
    onSuccess: (data) => {
      queryClient.setQueryData(
        keystore.boardGameHistoryKeys.readAllBoardGameHistory,
        data
      );
    },
  });
}
