import { z } from "zod";

const scorecardSchema = z.object({
  username: z.string().min(1, { message: "Required." }),
  socketId: z.string().min(1, { message: "Required." }),
  birds: z.number().min(1, { message: "Required." }),
  bonusCards: z.number().min(1, { message: "Required." }),
  endOfRoundGoals: z.number().min(1, { message: "Required." }),
  eggs: z.number().min(1, { message: "Required." }),
  foodOnCards: z.number().min(1, { message: "Required." }),
  tuckedCards: z.number().min(1, { message: "Required." }),
});

export default scorecardSchema;
