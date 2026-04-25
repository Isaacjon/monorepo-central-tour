import axios from "axios"

import { installAuthInterceptors } from "@/shared/api/auth-interceptors"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  params: {
    "project-id": process.env.NEXT_PUBLIC_U_CODE_PROJECT_ID,
  },
  headers: {
    "Content-Type": "application/json",
    "environment-id": process.env.NEXT_PUBLIC_U_CODE_ENVIRONMENT_ID,
  },
})

installAuthInterceptors(apiClient, {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  projectId: process.env.NEXT_PUBLIC_U_CODE_PROJECT_ID,
  environmentId: process.env.NEXT_PUBLIC_U_CODE_ENVIRONMENT_ID,
  iamFunctionName: process.env.NEXT_PUBLIC_U_CODE_IAM_FUNCTION_NAME?.trim(),
})

export default apiClient
