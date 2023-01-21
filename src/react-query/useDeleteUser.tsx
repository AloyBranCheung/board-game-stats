// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "./keystore";

export default function useDeleteUser() {
  const { deleteSingleUser } = useFirebaseUserDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.users.deleteUser.queryKey,
    mutationFn: (_id: string) => deleteSingleUser(_id),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.users.readAllUsers.queryKey, data);
    },
  });
}
