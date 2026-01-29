// src/modules/email/schemas/email.schema.ts
import { z } from 'zod';

export const checkEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El email es requerido' })
    .email({ message: 'Formato de email inválido' })
    .transform((val) => val.toLowerCase()),
});

export type CheckEmailSchemaDto = z.infer<typeof checkEmailSchema>;
