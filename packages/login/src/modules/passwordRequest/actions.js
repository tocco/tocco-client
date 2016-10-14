export const REQUEST_PASSWORD = 'Login/REQUEST_PASSWORD'

export function requestPassword(username) {
  return {
    type: REQUEST_PASSWORD,
    payload: {
      username
    }
  }
}
