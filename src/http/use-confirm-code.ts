import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import type { ConfirmCodeRequest } from "./types/confirm-code-request"
import type { ConfirmCodeResponse } from "./types/confirm-code-response"
import { signToken } from "@/lib/auth"
import { api } from "./config/api"

export function useConfirmCode() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ConfirmCodeRequest) => {

      const response = await api.patch<ConfirmCodeResponse>('/code', data)

      return response.data
    },
    onSuccess: (data) => {
      signToken(data.token)
      navigate('/', { replace: true })
    }
  })
}