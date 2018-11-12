import ClientQuestionCancelledException from './ClientQuestionCancelledException'

describe('app-extensions', () => {
  describe('rest', () => {
    describe('ClientQuestionCancelledException', () => {
      test(
        'should be an instanceof ClientQuestionCancelledException and Error',
        () => {
          const exc = new ClientQuestionCancelledException()

          // `instanceof ClientQuestionCancelledException` returns false,
          // if we just extend `Error` instead of `ExtendableError`
          expect(exc instanceof ClientQuestionCancelledException).to.be.true

          expect(exc instanceof Error).to.be.true
        }
      )
    })
  })
})
