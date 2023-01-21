import { createQueryKeys } from "@lukemorales/query-key-factory";

const boardGameOptionsKeys = createQueryKeys("boardGameOptions", {
  readAllBoardGameOptions: ["readAllBoardGameOptions"],
});

export default boardGameOptionsKeys;
