import validate, * as rules from './validate'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('password', () => {
        describe('validate', () => {
          describe('rule PASSWORD_NOT_CHANGED', () => {
            it('should succeed with different passwords', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_PASSWORD_NOT_CHANGED
              }])
              expect(errors).to.deep.equal({})
            })

            it('should fail with same passwords', () => {
              const errors = validate('same', 'same', [{
                name: rules.RULE_PASSWORD_NOT_CHANGED
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_PASSWORD_NOT_CHANGED]: true
              })
            })
          })

          describe('rule LENGTH', () => {
            it('should succeed if valid', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_LENGTH,
                params: {
                  min: 3,
                  max: 3
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('should fail if too short', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_LENGTH,
                params: {
                  min: 4
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_LENGTH]: true
              })
            })

            it('should fail if too long', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_LENGTH,
                params: {
                  max: 2
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_LENGTH]: true
              })
            })
          })

          describe('rule CHARACTER_INSUFFICIENT_LOWERCASE', () => {
            it('should succeed if valid', () => {
              const errors = validate('nEW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE,
                params: {
                  min: 1,
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('should fail if too few lower case characters', () => {
              const errors = validate('NEW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE,
                params: {
                  min: 1
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE]: true
              })
            })

            it('should fail if too many lower case characters', () => {
              const errors = validate('neW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE,
                params: {
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE]: true
              })
            })
          })

          describe('rule CHARACTER_INSUFFICIENT_UPPERCASE', () => {
            it('should succeed if valid', () => {
              const errors = validate('neW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE,
                params: {
                  min: 1,
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('should fail if too few upper case characters', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE,
                params: {
                  min: 1
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE]: true
              })
            })

            it('should fail if too many lower case characters', () => {
              const errors = validate('nEW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE,
                params: {
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE]: true
              })
            })
          })

          describe('rule CHARACTER_INSUFFICIENT_DIGIT', () => {
            it('should succeed if valid', () => {
              const errors = validate('new1', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_DIGIT,
                params: {
                  min: 1,
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('should fail if too few upper case characters', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_DIGIT,
                params: {
                  min: 1
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_DIGIT]: true
              })
            })

            it('should fail if too many upper case characters', () => {
              const errors = validate('new12', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_DIGIT,
                params: {
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_DIGIT]: true
              })
            })
          })
        })
      })
    })
  })
})
