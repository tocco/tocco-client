import {urlValidator} from './type'

describe('tocco-util', () => {
  describe('form', () => {
    describe('validators', () => {
      describe('type', () => {
        describe('url', () => {
          it('should not return an error for valid inputs', () => {
            const validValues = [
              'http://www.tocco.ch',
              'https://google.com',
              'ftp://myftp.upload.com'
            ]

            validValues.forEach(validValue => {
              const result = urlValidator(validValue)
              expect(result).to.be.null
            })
          })

          it('should return an error for invalid values', () => {
            const invalidValues = [
              'a',
              'httb://test.com',
              'www gooogle com',
              ' ',
              ''
            ]

            invalidValues.forEach(invalidValue => {
              const result = urlValidator(invalidValue)
              expect(result).to.not.be.null
            })
          })
        })
      })
    })
  })
})
