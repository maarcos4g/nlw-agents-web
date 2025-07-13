import { useQuery } from "@tanstack/react-query"
import { env } from "@/env"
import { getToken } from "@/lib/auth"
import type { GetRoomResponse } from "./types/get-room-response"
import { toast } from "sonner"

export function useRoom(code: string) {
  const { token } = getToken()

  return useQuery({
    queryKey: ['get-room', code],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/rooms/${code}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        toast.error(response.text())
        throw new Error('Network response was not ok')
      }
      const result: GetRoomResponse = await response.json()
      return result
    }
  })
}