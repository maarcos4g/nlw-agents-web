import { getToken } from "@/lib/auth";
import { redirect } from 'react-router-dom'

export function appLoader() {
  const { token } = getToken()

  if (!token) {
    return redirect('/auth')
  }

  return null
}