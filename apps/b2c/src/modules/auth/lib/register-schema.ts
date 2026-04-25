import { z } from "zod"

export type RegisterFormMessages = {
  phoneInvalid: string
  emailInvalid: string
  nameRequired: string
  nameInvalidChars: string
}

const NAME_PATTERN = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u

export function createRegisterFormSchema(messages: RegisterFormMessages) {
  return z
    .object({
      loginTab: z.enum(["phone", "email"]),
      phone: z.string(),
      email: z.string(),
      lastName: z.string(),
      firstName: z.string(),
      middleName: z.string(),
    })
    .superRefine((data, ctx) => {
      const checkName = (
        value: string,
        path: "lastName" | "firstName" | "middleName"
      ) => {
        const normalized = value.trim()
        if (normalized.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.nameRequired,
            path: [path],
          })
          return
        }
        if (!NAME_PATTERN.test(normalized)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.nameInvalidChars,
            path: [path],
          })
        }
      }
      checkName(data.lastName, "lastName")
      checkName(data.firstName, "firstName")
      checkName(data.middleName, "middleName")

      if (data.loginTab === "phone") {
        const digits = data.phone.replace(/\D/g, "")
        if (digits.length < 9 || digits.length > 15) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.phoneInvalid,
            path: ["phone"],
          })
        }
      } else {
        const parsed = z.string().email().safeParse(data.email.trim())
        if (!parsed.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.emailInvalid,
            path: ["email"],
          })
        }
      }
    })
}

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>
