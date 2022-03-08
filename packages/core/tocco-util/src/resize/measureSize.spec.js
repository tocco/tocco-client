import measureSize from './measureSize'

describe('tocco-util', () => {
  describe('resize', () => {
    describe('measureSize', () => {
      test('should calculate size', () => {
        const lastPosition = 50
        const currentPosition = 55
        const currentSize = 100

        const size = measureSize(lastPosition, currentPosition, currentSize)
        expect(size).to.equal(105)
      })

      test('should handle shrinking sizes', () => {
        const lastPosition = 60
        const currentPosition = 55
        const currentSize = 100

        const size = measureSize(lastPosition, currentPosition, currentSize)
        expect(size).to.equal(95)
      })

      test('should have minimum size of 50', () => {
        const lastPosition = 10
        const currentPosition = 15
        const currentSize = 5

        const size = measureSize(lastPosition, currentPosition, currentSize)
        expect(size).to.equal(50)
      })
    })
  })
})
