import ForbiddenException from './ForbiddenException'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('ForbiddenException', () => {
      test('should be an instanceof ForbiddenException and Error', () => {
        const exc = new ForbiddenException()

        // `instanceof ForbiddenException` returns false,
        // if we just extend `Error` instead of `ExtendableError`
        expect(exc instanceof ForbiddenException).to.be.true

        expect(exc instanceof Error).to.be.true
      })
    })
  })
})
