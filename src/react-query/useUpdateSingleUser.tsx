// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "./keystore";
// types
import { UserObj } from "src/@types/UserTypes";

interface UpdateSingleUser {
  _id: string;
  value: UserObj;
}

export default function useUpdateSingleUser() {
  const { updateSingleUser } = useFirebaseUserDb();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id, value }: UpdateSingleUser) => {
      updateSingleUser(_id, value);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.users.readAllUsers.queryKey],
      }),
  });
}
