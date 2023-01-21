import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import boardGameHistoryKeys from "./boardGameHistoryKeyStore";
import boardGameOptionsKeys from "./boardGameOptionsKeyStore";
import usersKey from "./usersKeyStore";

const queryKeys = mergeQueryKeys(
  boardGameHistoryKeys,
  boardGameOptionsKeys,
  usersKey
);

export default queryKeys;
