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

describe('tocco-util', () => {
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
    })
  })
})
