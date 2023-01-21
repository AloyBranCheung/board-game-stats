// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "./keystore";
// types/validators
import { z } from "zod";
import { createNewUserSchema } from "src/validators/UserValidation";

export default function useAddNewUser() {
  const { createNewUser } = useFirebaseUserDb();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof createNewUserSchema>) =>
      createNewUser(data.name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.readAllUsers.queryKey,
      });
    },
  });
}
