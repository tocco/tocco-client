import {buildUserMecardString} from './qrCodeUtils'

describe('user-qr-action', () => {
  describe('utils', () => {
    describe('buildUserMecardString', () => {
      test('should build minimal MECARD string', () => {
        const data = {
          firstname: 'Max',
          lastname: 'Muster'
        }

        expect(buildUserMecardString(data)).to.equal('MECARD:N:Muster,Max;')
      })

      test('should build complete MECARD string', () => {
        const data = {
          firstname: 'Max',
          lastname: 'Muster',
          c_address: 'Riedtlistrasse 27<br>8006 Zürich',
          phone_mobile: '+41791234567',
          phone_company: '+41443886000',
          phone_private: '+41441230099',
          email: 'max.muster@example.com',
          email_alternative: 'mm@test.ch',
          birthdate: '1983-06-13'
        }

        expect(buildUserMecardString(data))
          .to.equal(
            'MECARD:N:Muster,Max;ADR:Riedtlistrasse 27,8006 Zürich;TEL:+41791234567;TEL:+41443886000;'
          + 'TEL:+41441230099;EMAIL:max.muster@example.com;EMAIL:mm@test.ch;BDAY:19830613;')
      })
    })
  })
})
