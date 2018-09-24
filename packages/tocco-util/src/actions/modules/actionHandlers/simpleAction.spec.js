import {validationErrorCompact} from './simpleAction'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('simpleAction', () => {
          describe('validationErrorCompact', () => {
            test('should return null on empty array', () => {
              expect(validationErrorCompact([])).to.be.null
            })

            test('should first path error', () => {
              const msg = 'message'
              expect(validationErrorCompact([{model: 'User', paths: {firstname: {firstname: [msg, 'message2']}}}]))
                .to.be.eql(msg)
            })

            test('should return first validator error', () => {
              const msg = 'message'
              expect(validationErrorCompact([{model: 'User', entityValidatorErrors: {firstname: [msg, 'message2']}}]))
                .to.be.eql(msg)
            })
          })
        })
      })
    })
  })
})
