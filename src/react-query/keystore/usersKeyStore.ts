import { createQueryKeys } from "@lukemorales/query-key-factory";

const usersKey = createQueryKeys("users", {
  readAllUsers: { queryKey: ["readAllUsers"] },
  updateSingleUser: { queryKey: ["updateSingleUser"] }, // mutation key
  deleteUser: { queryKey: ["deleteUser"] }, // mutation key
});

export default usersKey;
