import showBackButton from './showBackButton'

describe('entity-detail', () => {
  describe('util', () => {
    describe('detailView', () => {
      describe('showBackButton', () => {
        test('should return `true` if modelPaths is not empty', () => {
          const initialKey = '12'
          const modelPaths = ['some input']
          const result = showBackButton(initialKey, modelPaths)
          expect(result).to.be.true
        })

        test('should return `true` if initialKey is not a number', () => {
          const initialKey = 'not a number'
          const modelPaths = []
          const result = showBackButton(initialKey, modelPaths)
          expect(result).to.be.true
        })

        test(
          'should return `false` if modelPaths is empty and initialKey is a number',
          () => {
            const initialKey = '123'
            const modelPaths = []
            const result = showBackButton(initialKey, modelPaths)
            expect(result).to.be.false
          }
        )

        test('should return `true` if initialKey is `undefined`', () => {
          const initialKey = undefined
          const modelPaths = []
          const result = showBackButton(initialKey, modelPaths)
          expect(result).to.be.true
        })
      })
    })
  })
})
