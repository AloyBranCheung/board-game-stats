// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keystore from "./keystore";
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
        queryKey: [...keystore.usersKey.readAllUsers],
      });
    },
  });
}
