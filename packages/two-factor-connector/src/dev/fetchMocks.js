import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/principals/.*/two-factor'),
    () => ({
      secret: '7ad4b588f0774cf19ac518289c751486',
      totpUri: 'otpauth://totp/Tocco?secret=7ad4b588f0774cf19ac518289c751486'
    })
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/principals/.*/two-factor'),
    (url, opts) => JSON.parse(opts.body).userCode === '666666' ? 400 : 204
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/principals'),
    () => ({
      username: 'tocco',
      businessUnit: {
        id: 'test1',
        label: 'test1'
      },
      interfaceLanguage: 'de'
    }
    )
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/entities/2.0/Principal.*'),
    () => ({
      data: [
        {
          _links: null,
          key: '22',
          model: 'Principal',
          version: 0,
          paths: {
            relTwo_step_login_status: {
              type: 'entity',
              writable: null,
              value: {
                _links: null,
                key: '2',
                model: 'Two_step_login_status',
                version: 1,
                paths: {}
              }
            }
          }
        }
      ]
    }
    ))

  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.spy()
}
