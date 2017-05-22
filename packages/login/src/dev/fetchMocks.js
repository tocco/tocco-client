import {utilFetchMocks} from 'tocco-util'

export default function setupFetchMock(fetchMock) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(fetchMock, require('./messages.json'))
  utilFetchMocks.locales(fetchMock)

  fetchMock.post(new RegExp('^.*?/nice2/login$'), function(url, opts) {
    if (opts.body.includes('username=succ')) {
      return {success: true}
    } else if (opts.body.includes('username=two')) {
      return {
        TWOSTEPLOGIN: true,
        success: false,
        REQUESTEDCODE: 'A8',
        timeout: 30
      }
    } else if (opts.body.includes('username=reset')) {
      return {
        RESET_PASSWORD_REQUIRED: true,
        success: false,
        principal_id: '12345',
        timeout: 30
      }
    } else if (opts.body.includes('username=before_blocked')) {
      return {
        ONE_TILL_BLOCK: true,
        success: false
      }
    } else if (opts.body.includes('username=blocked')) {
      return {
        LOGIN_BLOCKED: true,
        success: false
      }
    } else {
      const delay = new Promise(resolve => setTimeout(resolve, 500))
      return delay.then({status: 401, body: { success: false }})
    }
  })
  fetchMock.post(new RegExp('^.*?/nice2/rest/principals/.*/password-reset$'), {})
  fetchMock.post(new RegExp('^.*?/nice2/rest/principals/.*/password-update$'), {})
  fetchMock.get(new RegExp('^.*?/nice2/rest/principals/.*/password-rules$'), function() {
    return require('./validationRules.json')
  })
  fetchMock.post(new RegExp('^.*?/nice2/rest/principals/.*/password-validation$'), function(url, opts) {
    if (JSON.parse(opts.body).newPassword.includes('tocco')) {
      return {
        valid: false,
        validationMessages: [{
          ruleName: 'DICTIONARY',
          message: 'Das neue Passwort darf das Wort "tocco" nicht enthalten'
        }]
      }
    } else {
      return { valid: true }
    }
  })
  fetchMock.spy()
}

module.exports = setupFetchMock
