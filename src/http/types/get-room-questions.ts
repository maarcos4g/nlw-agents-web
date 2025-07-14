export type GetRoomQuestionsResponse = Array<{
  id: string
  question: string
  answer: string | null
  createdAt: string
  sender: {
    id: string
    name: string
    email: string
  }
}>