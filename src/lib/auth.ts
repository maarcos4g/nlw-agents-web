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