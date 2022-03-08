import detail from './detail'

describe('entity-browser', () => {
  describe('util', () => {
    describe('detail', () => {
      describe('getMode', () => {
        test('should return update if id is defined', () => {
          const mode = detail.getMode('12')
          expect(mode).to.eql(detail.modes.UPDATE)
        })

        test('should return create if id is undefined', () => {
          const mode = detail.getMode(undefined)
          expect(mode).to.eql(detail.modes.CREATE)
        })
      })
    })
  })
})
