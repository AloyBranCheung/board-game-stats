import { z } from "zod";

export const createNewUserSchema = z.object({
  name: z.string().min(1),
});
