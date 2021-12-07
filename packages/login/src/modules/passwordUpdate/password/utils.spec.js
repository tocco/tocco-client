import * as utils from './utils'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('password', () => {
        describe('utils', () => {
          test('should return true if object is empty', () => {
            expect(utils.isEmptyObject({})).to.equal(true)
          })

          test('should return false if object is not empty', () => {
            expect(
              utils.isEmptyObject({
                foo: 'bar'
              })
            ).to.equal(false)
          })

          describe('validationMessagesToErrorMap', () => {
            test('should convert list to error map', () => {
              const messages = [
                {
                  ruleName: 'RULE_1',
                  message: 'Rule 1 failed'
                },
                {
                  ruleName: 'RULE_2',
                  message: 'Rule 2 failed'
                }
              ]

              const errors = {
                RULE_1: 'Rule 1 failed',
                RULE_2: 'Rule 2 failed'
              }

              expect(utils.validationMessagesToErrorMap(messages)).to.deep.equal(errors)
            })
          })
        })
      })
    })
  })
})
