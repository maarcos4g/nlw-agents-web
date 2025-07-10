import { useMutation } from "@tanstack/react-query"
import { env } from "@/env"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { CreateAccountRequest } from "./types/create-account-request"
import type { CreateAccountResponse } from "./types/create-account-response"
import { useSendAuthCode } from "./use-send-auth-code"

export function useCreateAccount() {
  const navigate = useNavigate()
  const { mutateAsync: sendAuthCode } = useSendAuthCode()

  return useMutation({
    mutationFn: async (data: CreateAccountRequest) => {
      const response = await fetch(`${env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        toast.error(response.text())
        throw new Error('Network response was not ok')
      }
      const result: CreateAccountResponse = await response.json()
      return result
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