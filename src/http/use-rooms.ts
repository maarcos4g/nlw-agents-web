import { useQuery } from "@tanstack/react-query"
import type { GetRoomsResponse } from "./types/get-rooms-response"
import { getToken } from "@/lib/auth"
import { api } from "./config/api"

export function useRooms() {
  const { token } = getToken()

  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const { data } = await api.get<GetRoomsResponse>('/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return data
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}