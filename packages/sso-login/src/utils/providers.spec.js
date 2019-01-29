import {transformProviderEntities} from './providers'

describe('sso-login', () => {
  describe('utils', () => {
    describe('providers', () => {
      describe('transformProviderEntities', () => {
        it('should return an array of flatten objects', () => {
          const response = require('../dev/data/openid_provider')
          const result = transformProviderEntities(response)

          const expectedResult = [
            {
              unique_id: 'google',
              label: 'Google',
              active: true,
              button_primary_color: '#bad6ff',
              button_icon: 'fab, google',
              button_label: 'Mit Google einloggen'
            },
            {
              unique_id: 'facebook',
              label: 'Facebook',
              active: true,
              button_primary_color: '#3A5696',
              button_label: 'Mit Facebook einloggen'
            },
            {
              unique_id: 'office365',
              label: 'Office 365',
              active: true,
              button_primary_color: '#d33b17',
              button_secondary_color: '#dddddd',
              button_icon: 'fab, microsoft',
              button_label: 'Mit Office 356 einloggen'
            }
          ]

          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
