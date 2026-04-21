import { z } from "zod"

const lettersOnly = /^[a-zA-ZА-Яа-яёЁ\s-]+$/

/** Full UZ phone pattern: +998 (XX) XXX-XX-XX with no unfilled mask slots */
const uzPhonePattern = /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/

/** 2 uppercase letters + 6 digits */
const passportPattern = /^[A-Z]{2}\d{6}$/

/** DD.MM.YY with no unfilled mask slots */
const birthDatePattern = /^\d{2}\.\d{2}\.\d{2}$/

export const profileDataSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "required" })
    .regex(lettersOnly, { message: "letters_only" }),

  lastName: z
    .string()
    .min(1, { message: "required" })
    .regex(lettersOnly, { message: "letters_only" }),

  middleName: z
    .string()
    .regex(lettersOnly, { message: "letters_only" })
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .min(1, { message: "required" })
    .refine((v) => uzPhonePattern.test(v), { message: "invalid_phone" }),

  email: z.string().email({ message: "invalid" }).or(z.literal("")),

  passport: z
    .string()
    .refine((v) => v === "" || passportPattern.test(v), { message: "invalid_passport" })
    .optional()
    .or(z.literal("")),

  birthDate: z
    .string()
    .refine((v) => v === "" || birthDatePattern.test(v), { message: "invalid_date" })
    .optional()
    .or(z.literal("")),
})

export type ProfileDataValues = z.infer<typeof profileDataSchema>
