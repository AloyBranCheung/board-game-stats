import { z } from "zod";

export const createNewUserSchema = z.object({
  name: z.string().min(1),
});

export const createNewUserSubmitToDb = z.object({
  name: z.string().min(1),
  _id: z.string().min(1),
});
