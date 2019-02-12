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
              button_primary_color: '#4285f4',
              button_secondary_color: '#fff',
              button_icon: 'fab, google',
              button_label: 'Mit Google einloggen'
            },
            {
              unique_id: 'office365',
              label: 'Office 365',
              active: true,
              button_primary_color: '#ea3e23',
              button_secondary_color: '#f3f4f7',
              button_icon: 'fab,microsoft',
              button_label: 'Mit Office 356 einloggen'
            }
          ]

          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
