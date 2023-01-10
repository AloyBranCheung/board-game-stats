// firebase
import useFirebaseUserDb from "src/hooks/useFirebaseUserDb";
// react-query
import { useQuery } from "@tanstack/react-query";
import keystore from "./keystore";

export default function useReadAllUsers() {
  const { readAllUsers } = useFirebaseUserDb();
  return useQuery({
    queryKey: keystore.usersKey.readAllUsers,
    queryFn: readAllUsers,
  });
}
