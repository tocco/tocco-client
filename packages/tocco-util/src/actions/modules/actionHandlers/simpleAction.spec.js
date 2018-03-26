import {validationErrorCompact} from './simpleAction'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('actionHandler', () => {
        describe('simpleAction', () => {
          describe('validationErrorCompact', () => {
            it('should return null on empty array', () => {
              expect(validationErrorCompact([])).to.be.null
            })

            it('should first path error', () => {
              const msg = 'message'
              expect(validationErrorCompact([{model: 'User', paths: {firstname: {firstname: [msg, 'message2']}}}]))
                .to.be.eql(msg)
            })

            it('should return first validator error', () => {
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
