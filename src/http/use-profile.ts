import { useQuery } from "@tanstack/react-query"
import type { GetProfileResponse } from "./types/get-profile-response"
import { env } from "@/env"
import { getToken } from "@/lib/auth"

export function useProfile() {

  const { token } = getToken()

  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result: GetProfileResponse = await response.json()
      return result
    }
  })
}