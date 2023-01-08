import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const createNewBoardGameHistorySchema = z.object({
  datePicked: z.instanceof(dayjs as unknown as typeof Dayjs),
  boardGame: z
    .string()
    .min(1, { message: "Must be at least 1 character long." }),
  winner: z.string().min(1, { message: "Must be at least 1 character long." }),
  loser: z.string().min(1, { message: "Must be at least 1 character long." }),
  comments: z.string().nullable(),
});
