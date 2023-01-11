// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query mutate
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keystore from "./keystore";
// types
import { BoardGameHistory } from "src/@types/BoardGameTypes";

export default function useUpdateBoardGameHistory() {
  const { updateSingleBoardGameHistory } = useFirebaseBoardGameDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, value }: { _id: string; value: BoardGameHistory }) =>
      updateSingleBoardGameHistory(_id, value),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [...keystore.boardGameHistoryKeys.readAllBoardGameHistory],
      }),
  });
}
