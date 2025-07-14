import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { CreateAccountRequest } from "./types/create-account-request"
import type { CreateAccountResponse } from "./types/create-account-response"
import { useSendAuthCode } from "./use-send-auth-code"
import { api } from "./config/api"

export function useCreateAccount() {
  const navigate = useNavigate()
  const { mutateAsync: sendAuthCode } = useSendAuthCode()

  return useMutation({
    mutationFn: async (data: CreateAccountRequest) => {

      const response = await api.post<CreateAccountResponse>('/users', data)
      return response.data
    },
    onMutate: ({ email }) => {
      sessionStorage.setItem('@email', email)
    },
    onSuccess: () => {
      sendAuthCode({ email: sessionStorage.getItem('@email') ?? '' })
      toast.success('Código enviado com sucesso!')
      navigate({
        pathname: '/confirm'
      })
    }
  })
}