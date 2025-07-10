import { useMutation } from "@tanstack/react-query"
import { env } from "@/env"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { ConfirmCodeRequest } from "./types/confirm-code-request"
import type { ConfirmCodeResponse } from "./types/confirm-code-response"
import { signToken } from "@/lib/auth"

export function useConfirmCode() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: ConfirmCodeRequest) => {
      const response = await fetch(`${env.VITE_API_URL}/code`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        toast.error(response.text())
        throw new Error('Network response was not ok')
      }
      const result: ConfirmCodeResponse = await response.json()
      return result
    },
    onSuccess: (data) => {
      signToken(data.token)
      navigate('/', { replace: true })
    }
  })
}