export function getResponse(data) {
  const type = getResponseType(data)
  switch (type) {
    case 'success':
      return {
        success: true
      }
    case 'two_factor':
      return {
        TWOSTEPLOGIN: true,
        success: false,
        REQUESTEDCODE: 'A8',
        timeout: 30
      }
    case 'reset_password':
      return {
        RESET_PASSWORD_REQUIRED: true,
        success: false,
        principal_id: '12345',
        timeout: 30
      }
    case 'before_blocked':
      return {
        ONE_TILL_BLOCK: true,
        success: false
      }
    case 'blocked':
      return {
        LOGIN_BLOCKED: true,
        success: false
      }
    default:
      return {
        success: false
      }
  }
}

function getResponseType(data) {
  const mapCredentialsToResponses = require('./login_responses.json')
  for (const value of mapCredentialsToResponses.credentials) {
    if (data.username === value.username) {
      return value.response_type
    }
  }
}
