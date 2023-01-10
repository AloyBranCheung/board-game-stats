// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keystore from "./keystore";

export default function useDeleteUser() {
  const { deleteSingleUser } = useFirebaseUserDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keystore.usersKey.deleteUser,
    mutationFn: (_id: string) => deleteSingleUser(_id),
    onSuccess: (data) => {
      queryClient.setQueryData(keystore.usersKey.readAllUsers, data);
    },
  });
}
