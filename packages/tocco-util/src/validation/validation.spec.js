import {getErrorCompact} from './validation'

describe('tocco-util', () => {
  describe('validation', () => {
    describe('getErrorCompact', () => {
      test('should return null on empty array', () => {
        expect(getErrorCompact([])).to.be.null
      })

      test('should first path error', () => {
        const msg = 'message'
        expect(getErrorCompact([{model: 'User', paths: {firstname: {firstname: [msg, 'message2']}}}]))
          .to.be.eql(msg)
      })

      test('should return first validator error', () => {
        const msg = 'message'
        expect(getErrorCompact([{model: 'User', entityValidatorErrors: {firstname: [msg, 'message2']}}]))
          .to.be.eql(msg)
      })

      test('should return first validator error', () => {
        const msg = 'message'
        expect(getErrorCompact([{model: 'User', entityValidatorErrors: {firstname: [msg, 'message2']}}]))
          .to.be.eql(msg)
      })
    })
  })
})
