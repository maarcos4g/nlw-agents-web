export type GetRoomResponse = {
  room: {
    id: string
    name: string
    description: string
    createdAt: string
    code: string
    ownerId: string
  }
}