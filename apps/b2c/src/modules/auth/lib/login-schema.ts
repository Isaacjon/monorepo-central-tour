import { z } from "zod"

export type LoginFormMessages = {
  phoneInvalid: string
  emailInvalid: string
}

export function createLoginFormSchema(messages: LoginFormMessages) {
  return z
    .object({
      loginTab: z.enum(["phone", "email"]),
      phone: z.string(),
      email: z.string(),
    })
    .superRefine((data, ctx) => {
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

export type LoginFormValues = z.infer<ReturnType<typeof createLoginFormSchema>>
