import { useQuery } from "@tanstack/react-query"
import type { GetProfileResponse } from "./types/get-profile-response"
import { getToken } from "@/lib/auth"
import { api } from "./config/api"

export function useProfile() {

  const { token } = getToken()

  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {

      const { data } = await api.get<GetProfileResponse>('/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return data
    }
  })
}