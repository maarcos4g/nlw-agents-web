import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateRoomRequest } from "./types/create-room-request"
import type { CreateRoomResponse } from "./types/create-room-response"
import { env } from "@/env"
import { getToken } from "@/lib/auth"

export function useCreateRoom() {
  const { token } = getToken()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch(`${env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result: CreateRoomResponse = await response.json()
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    }
  })
}