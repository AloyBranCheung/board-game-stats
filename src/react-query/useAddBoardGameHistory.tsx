// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import keystore from "./keystore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// types
import { z } from "zod";
import { createNewBoardGameHistorySchema } from "src/validators/BoardGameHistoryValidation";

export default function useAddBoardGameHistory() {
  const { createBoardGameHistory } = useFirebaseBoardGameDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: z.infer<typeof createNewBoardGameHistorySchema>) =>
      createBoardGameHistory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [...keystore.boardGameHistoryKeys.readAllBoardGameHistory],
      }),
  });
}
