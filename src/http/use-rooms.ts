import { useQuery } from "@tanstack/react-query"
import type { GetRoomsResponse } from "./types/get-rooms-response"
import { env } from "@/env"

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/rooms`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result: GetRoomsResponse = await response.json()
      return result
    }
  })
}