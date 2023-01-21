import { createQueryKeys } from "@lukemorales/query-key-factory";

const boardGameHistoryKeys = createQueryKeys("boardGameHistory", {
  readAllBoardGameHistory: {
    queryKey: ["readAllBoardGameHistory"],
  },
});

// {
//   readAllBoardGameHistory: ["readAllBoardGameHistory"],
// };

export default boardGameHistoryKeys;
