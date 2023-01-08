import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const createNewBoardGameHistorySchema = z.object({
  datePicked: z.instanceof(dayjs as unknown as typeof Dayjs),
  boardGame: z.string().min(1),
  winner: z.string().min(1),
  loser: z.string().min(1),
  comments: z.string().nullable(),
});
