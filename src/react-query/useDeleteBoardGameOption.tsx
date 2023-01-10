// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import boardGameOptionsKeys from "./keystore/boardGameOptionsKeyStore";

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
        boardGameOptionsKeys.readAllBoardGameOptions,
        data
      ),
  });
}
