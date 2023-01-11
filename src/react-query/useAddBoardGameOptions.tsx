// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import boardGameOptionsKeys from "./keystore/boardGameOptionsKeyStore";
// types/validators
import { z } from "zod";
import { boardGameOptionSchema } from "src/validators/BoardGameHistoryValidation";

export default function useAddBoardGameOptions() {
  const { createBoardGameOption } = useFirebaseBoardGameDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof boardGameOptionSchema>) => {
      const newData = await createBoardGameOption(data);
      return newData;
    },
    onSuccess: (data) =>
      queryClient.setQueriesData(
        boardGameOptionsKeys.readAllBoardGameOptions,
        data
      ),
  });
}
