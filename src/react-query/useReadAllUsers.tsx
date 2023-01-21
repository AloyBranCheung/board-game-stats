// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useQuery } from "@tanstack/react-query";
import queryKeys from "./keystore";

export default function useReadAllUsers() {
  const { readAllUsers } = useFirebaseUserDb();
  return useQuery({
    queryKey: queryKeys.users.readAllUsers.queryKey,
    queryFn: readAllUsers,
  });
}
