import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  universityId: z.string().min(1),
  password: z.string().min(8),
  universityCard: z.string().min(1),
});

export const signInSchema = z.object({
 email: z.string().email(),
 password: z.string().min(8),
});