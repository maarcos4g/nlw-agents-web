import { useQuery } from "@tanstack/react-query"
import type { GetRoomQuestionsResponse } from "./types/get-room-questions"
import { api } from "./config/api"

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {

      const response = await api.get<GetRoomQuestionsResponse>(`/rooms/${roomId}/questions`)

      return response.data
    }
  })
}