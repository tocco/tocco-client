import formErrors from './formErrors'

const testData = {
  firstname: {
    firstname: [
      'SUBMIT ERROR: Firstname should not be "illegal2".'
    ]
  },
  _error: {
    relatedEntityErrors: [
      {
        model: 'Related_entity',
        key: '3',
        paths: {
          username: {
            username: [
              'Related entity path error'
            ]
          }
        },
        entityValidatorErrors: {
          SomeId: ['1'],
          SomeOtherId: ['2', '3']
        }
      }
    ],
    entityValidatorErrors: {
      UsernameAsciiValidator: ['1'],
      OtherId: ['2', '3']
    }
  }
}

describe('app-extensions', () => {
  describe('form', () => {
    describe('formError', () => {
      describe('hasFieldErrors', () => {
        test('should return true if it has', () => {
          expect(formErrors.hasFieldErrors({...testData})).to.be.true
        })
        test('should return false if it hasnt', () => {
          expect(formErrors.hasFieldErrors({_error: {}})).to.be.false
        })
      })

      describe('getFieldErrors', () => {
        test('should return only field errors', () => {
          expect(formErrors.getFieldErrors({...testData}))
            .to.eql({firstname: testData.firstname})
        })
        test('should return an empty object in case of no field errors', () => {
          expect(formErrors.getFieldErrors({_error: {}})).to.eql({})
        })
      })

      describe('hasValidatorErrors', () => {
        test('should return true if has validationErrors', () => {
          expect(formErrors.hasValidatorErrors({...testData}))
            .to.be.true
        })

        test('should return an empty object in case of no validator errors', () => {
          expect(formErrors.hasValidatorErrors({})).to.be.false
          expect(formErrors.hasValidatorErrors({_error: {}})).to.be.false
        })
      })

      describe('getValidatorErrors', () => {
        test('should validator errors in one array', () => {
          expect(formErrors.getValidatorErrors({...testData}))
            .to.eql(['1', '2', '3'])
        })
      })

      describe('hasRelatedEntityErrors', () => {
        test('should return true if has relation errors', () => {
          expect(formErrors.hasRelatedEntityErrors({...testData}))
            .to.be.true
        })

        test('should return false in case of no relation errors', () => {
          expect(formErrors.hasRelatedEntityErrors({_error: {}}))
            .to.be.false
        })
      })

      describe('getRelatedEntityErrorsCompact', () => {
        test('should return an array with all messages', () => {
          expect(formErrors.getRelatedEntityErrorsCompact({...testData}))
            .to.eql(
              [
                'Related entity path error (username, Related_entity, 3)',
                '1 (Related_entity, 3)',
                '2 (Related_entity, 3)',
                '3 (Related_entity, 3)'
              ]
            )
        })
      })

      describe('getFirstErrorField', () => {
        test('should return true if has relation errors', () => {
          expect(formErrors.getFirstErrorField({...testData}))
            .to.eql('firstname')
        })
      })

      describe('hasOutdatedError', () => {
        test('should return bool depending on object', () => {
          expect(formErrors.hasOutdatedError({_error: {outdatedError: {key: '1'}}})).to.be.true
          expect(formErrors.hasOutdatedError({_error: {}})).to.be.false
          expect(formErrors.hasOutdatedError({})).to.be.false
        })
      })

      describe('getOutdatedError', () => {
        test('should return outdatedObject', () => {
          const outdatedError = {key: '1'}
          expect(formErrors.getOutdatedError({_error: {outdatedError}})).to.eql(outdatedError)
        })
      })

      describe('outdatedResponseToFormError', () => {
        const response = {
          status: 412,
          message: 'Version of entity User_status with key 2 is outdated. Given version: 111, Current version: 3',
          errorCode: 'OUTDATED_ENTITY',
          updateUser: 'user3',
          updateTimestamp: '2021-07-27T14:15:18.220Z',
          model: 'User',
          key: '222'
        }

        const entity = {model: 'User', key: '222'}

        test('should return outdatedObject', () => {
          const expectedResult = {
            _error: {
              outdatedError: {
                model: 'User',
                key: '222',
                sameEntity: true,
                updateTimestamp: '2021-07-27T14:15:18.220Z',
                updateUser: 'user3'
              }
            }
          }
          expect(formErrors.outdatedResponseToFormError(response, entity)).to.eql(expectedResult)
        })

        test('should set sameEntity false if no match', () => {
          const result = formErrors.outdatedResponseToFormError(response, {model: 'Address', key: '3'})
          expect(result._error.outdatedError.sameEntity).to.be.false
        })
      })
    })
  })
})
