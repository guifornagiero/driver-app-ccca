import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  carPlate: z.string(),
  password: z.string(),
  isPassenger: z.boolean(),
  isDriver: z.boolean()
});