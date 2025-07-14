import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateQuestionRequest } from "./types/create-question-request"
import type { CreateQuestionResponse } from "./types/create-question-response"
import type { GetRoomQuestionsResponse } from "./types/get-room-questions"
import { api } from "./config/api"
import { getToken } from "@/lib/auth"
import type { GetProfileResponse } from "./types/get-profile-response"

export function useCreateQuestion(roomId: string) {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const { token } = getToken()

      const response = await api.post<CreateQuestionResponse>(`/rooms/${roomId}/questions`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return response.data
    },

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>(['get-questions', roomId])

      const questionsArray = questions ?? []

      const profileData: GetProfileResponse | undefined = queryClient.getQueryData(['get-profile'])

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
        sender: {
          id: profileData?.user.id ?? '',
          name: profileData?.user.name ?? '',
          email: profileData?.user.email ?? ''
        },
      }

      queryClient.setQueryData<GetRoomQuestionsResponse>(['get-questions', roomId],
        [
          newQuestion,
          ...questionsArray
        ]
      )

      return { newQuestion, questions }
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        questions => {
          if (!questions) {
            return questions
          }

          if (!context.newQuestion) {
            return questions
          }

          return questions.map(question => {
            if (question.id === context.newQuestion.id) {
              return { ...context.newQuestion, id: data.questionId, answer: data.answer, isGeneratingAnswer: false }
            }

            return question
          })
        }
      )
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context.questions
        )
      }
    },
  })
}