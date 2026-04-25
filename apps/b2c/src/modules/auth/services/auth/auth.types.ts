export type ContactMethod = "phone" | "email"
export type AuthMode = "register" | "login"

export type SendOtpInput = {
  method: ContactMethod
  value: string
  mode: AuthMode
}

export type RegisterClientInput = {
  firstName: string
  lastName: string
  middleName: string
  contactMethod: ContactMethod
  contactValue: string
  otp: string
}

export type LoginClientInput = {
  contactMethod: ContactMethod
  contactValue: string
  otp: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
  userId: string
}

export type InvokeMethod = "send_otp" | "register_client" | "login_client"

export type UCodeResponse = {
  data?: {
    data?: {
      access_token?: string
      refresh_token?: string
      user_id?: string
      msg?: string
      [key: string]: unknown
    }
    server_error?: string
    status?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}
