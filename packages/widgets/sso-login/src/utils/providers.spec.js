import {transformProviderEntities} from './providers'

describe('sso-login', () => {
  describe('utils', () => {
    describe('providers', () => {
      describe('transformProviderEntities', () => {
        test('should return an array of flatten objects', () => {
          const response = require('../dev/data/openid_provider')
          const result = transformProviderEntities(response)

          const expectedResult = [
            {
              button_icon: 'google',
              button_label: 'Google',
              button_primary_color: '#D44638',
              button_secondary_color: '',
              label: 'Google',
              unique_id: 'google'
            },
            {
              button_icon: 'microsoft',
              button_label: 'Office 365',
              button_primary_color: '#0078d7',
              button_secondary_color: '',
              label: 'Office 365',
              unique_id: 'office_365'
            }
          ]

          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
