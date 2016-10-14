export function getResponse(data) {
  const headers = {'Content-Type': 'application/json; charset=utf-8'}

  var response
  var type = getResponseType(data)
  switch (type) {
    case 'success':
      response = new Response('{"success":true}', {
        headers
      })
      break
    case 'two_factor':
      response = new Response('{"TWOSTEPLOGIN":true,"success":false,"REQUESTEDCODE":"A8","timeout":30}', {
        headers
      })
      break
    case 'reset_password':
      response = new Response('{"RESET_PASSWORD_REQUIRED":true,"success":false,"principal_id":"12345","timeout":30}', {
        headers
      })
      break
    case 'before_blocked':
      response = new Response('{"ONE_TILL_BLOCK":true,"success":false}', {
        headers,
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      })
      break
    case 'blocked':
      response = new Response('{"LOGIN_BLOCKED":true,"success":false}', {
        headers,
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      })
      break
    default:
      response = new Response('{"success":false}', {
        headers,
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      })
  }

  return response
}

function getResponseType(data) {
  const mapCredentialsToResponses = require('./login_responses.json')
  for (let value of mapCredentialsToResponses.credentials) {
    if (data.username === value.username) {
      return value.response_type
    }
  }
}
