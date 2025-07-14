import { useMutation } from "@tanstack/react-query"
import type { SendAuthCodeRequest } from "./types/send-auth-code-request"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { SendAuthCodeResponse } from "./types/send-auth-code-response"
import { api } from "./config/api"

export function useSendAuthCode() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: SendAuthCodeRequest) => {

      const response = await api.post<SendAuthCodeResponse>('/code', data)
      return response.data
    },
    onMutate: ({ email }) => {
      sessionStorage.setItem('@email', email)
    },
    onSuccess: () => {
      toast.success('Código enviado com sucesso!')
      navigate({
        pathname: '/confirm'
      })
    }
  })
}