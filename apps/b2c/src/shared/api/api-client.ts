import axios from "axios"

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

export default apiClient
