import validate, * as rules from './validate'

describe('login', () => {
  describe('modules', () => {
    describe('passwordUpdate', () => {
      describe('password', () => {
        describe('validate', () => {
          describe('rule PASSWORD_NOT_CHANGED', () => {
            it('succeeds with different passwords', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_PASSWORD_NOT_CHANGED
              }])
              expect(errors).to.deep.equal({})
            })

            it('fails with same passwords', () => {
              const errors = validate('same', 'same', [{
                name: rules.RULE_PASSWORD_NOT_CHANGED
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_PASSWORD_NOT_CHANGED]: true
              })
            })
          })

          describe('rule LENGTH', () => {
            it('succeeds if valid', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_LENGTH,
                params: {
                  min: 3,
                  max: 3
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('fails if too short', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_LENGTH,
                params: {
                  min: 4,
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_LENGTH]: true
              })
            })

            it('fails if too long', () => {
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
            it('succeeds if valid', () => {
              const errors = validate('nEW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE,
                params: {
                  min: 1,
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('fails if too few lower case characters', () => {
              const errors = validate('NEW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE,
                params: {
                  min: 1,
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_LOWERCASE]: true
              })
            })

            it('fails if too many lower case characters', () => {
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
            it('succeeds if valid', () => {
              const errors = validate('neW', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE,
                params: {
                  min: 1,
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('fails if too few upper case characters', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE,
                params: {
                  min: 1,
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_UPPERCASE]: true
              })
            })

            it('fails if too many lower case characters', () => {
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
            it('succeeds if valid', () => {
              const errors = validate('new1', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_DIGIT,
                params: {
                  min: 1,
                  max: 1
                }
              }])
              expect(errors).to.deep.equal({})
            })

            it('fails if too few upper case characters', () => {
              const errors = validate('new', 'old', [{
                name: rules.RULE_CHARACTER_INSUFFICIENT_DIGIT,
                params: {
                  min: 1,
                }
              }])
              expect(errors).to.deep.equal({
                [rules.RULE_CHARACTER_INSUFFICIENT_DIGIT]: true
              })
            })

            it('fails if too many upper case characters', () => {
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
