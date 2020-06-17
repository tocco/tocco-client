import {mockData, consoleLogger} from 'tocco-util'

const delay = new Promise(resolve => setTimeout(resolve, 500))

const response500 = () => {
  return delay.then(() => ({status: 500, body: 'Error 500'}))
}

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.post(new RegExp('^.*?/nice2/login$'), function(url, opts) {
    consoleLogger.log('called nice2/login', opts)
    if (opts.body.includes('username=succ')) {
      return {success: true}
    } else if (opts.body.includes('username=captcha')) {
      if (opts.body.includes('captchaToken')) {
        return {success: true}
      } else {
        return {
          CAPTCHA: true,
          success: false,
          timeout: 30
        }
      }
    } else if (opts.body.includes('username=two')) {
      return {
        TWOSTEPLOGIN: true,
        success: false,
        timeout: 30
      }
    } else if (opts.body.includes('username=reset')) {
      return {
        RESET_PASSWORD_REQUIRED: true,
        success: false,
        principal_id: '12345',
        timeout: 30
      }
    } else if (opts.body.includes('username=blocked')) {
      return {
        LOGIN_BLOCKED: true,
        success: false
      }
    } else if (opts.body.includes('username=error')) {
      return response500()
    } else {
      return delay.then(() => ({status: 401, body: {success: false}}))
    }
  })
  fetchMock.post(new RegExp('^.*?/nice2/rest/principals/.*/password-reset$'), {})
  fetchMock.post(new RegExp('^.*?/nice2/rest/principals/.*/password-update$'), (url, opts) => {
    consoleLogger.log('call password-update', opts)
    const oldPassword = JSON.parse(opts.body).oldPassword
    if (oldPassword === 'wrong') {
      return {status: 400, message: 'Invalid credentials', body: {errorCode: 'INVALID_CREDENTIALS'}}
    }
    if (oldPassword === 'error') {
      return response500()
    }
  })

  fetchMock.get(new RegExp('^.*?/nice2/rest/principals/.*/password-rules.*'), function() {
    return require('./validationRules.json')
  })
  fetchMock.post(new RegExp('^.*?/nice2/rest/principals/.*/password-validation.*'), function(url, opts) {
    const newPassword = JSON.parse(opts.body).newPassword

    if (newPassword.includes('tocco')) {
      return {
        valid: false,
        validationMessages: [{
          ruleName: 'DICTIONARY',
          message: 'Das neue Passwort darf das Wort "tocco" nicht enthalten'
        }]
      }
    } else if (newPassword.includes('error')) {
      return response500()
    } else {
      return {valid: true}
    }
  })
  fetchMock.spy()
}
