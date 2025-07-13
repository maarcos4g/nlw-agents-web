import type { GetProfileResponse } from '@/http/types/get-profile-response'
import type { GetRoomResponse } from '@/http/types/get-room-response'
import { useQueryClient } from '@tanstack/react-query'
import cookies from 'js-cookie'

export function signToken(token: string) {
  cookies.set('@token', token, {
    expires: 7, //7 days
    path: '/'
  })
}

export function getToken() {
  const token = cookies.get('@token')
  return { token }
}

export function signOut() {
  cookies.remove('@token')
}

export function isRoomOwner(roomCode: string) {
  const queryClient = useQueryClient()

  const roomData: GetRoomResponse | undefined = queryClient.getQueryData(['get-room', roomCode])
  const profileData: GetProfileResponse | undefined = queryClient.getQueryData(['get-profile'])

  if (!roomData && !profileData) {
    return null
  }

  return roomData?.room.ownerId === profileData?.user.id
}