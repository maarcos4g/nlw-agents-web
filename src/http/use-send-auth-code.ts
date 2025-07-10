import { useMutation } from "@tanstack/react-query"
import { env } from "@/env"
import type { SendAuthCodeRequest } from "./types/send-auth-code-request"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { SendAuthCodeResponse } from "./types/send-auth-code-response"

export function useSendAuthCode() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: SendAuthCodeRequest) => {
      const response = await fetch(`${env.VITE_API_URL}/code`, {
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
      const result: SendAuthCodeResponse = await response.json()
      return result
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