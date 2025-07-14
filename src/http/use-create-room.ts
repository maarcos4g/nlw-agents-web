import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateRoomRequest } from "./types/create-room-request"
import type { CreateRoomResponse } from "./types/create-room-response"
import { getToken } from "@/lib/auth"
import { api } from "./config/api"

export function useCreateRoom() {
  const { token } = getToken()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {

      const response = await api.post<CreateRoomResponse>('/rooms', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    }
  })
}