

const USER_TOKEN_KEY = 'USER_TOKEN'

export function getToken () {
  return localStorage.getItem(USER_TOKEN_KEY) || ''
}

export function setToken (token: string) {
  localStorage.setItem(USER_TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(USER_TOKEN_KEY)
}