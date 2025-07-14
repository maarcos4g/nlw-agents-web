import { useQuery } from "@tanstack/react-query"
import { getToken } from "@/lib/auth"
import type { GetRoomResponse } from "./types/get-room-response"
import { api } from "./config/api"

export function useRoom(code: string) {
  const { token } = getToken()

  return useQuery({
    queryKey: ['get-room', code],
    queryFn: async () => {
      const response = await api.get<GetRoomResponse>(`/rooms/${code}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return response.data
    }
  })
}