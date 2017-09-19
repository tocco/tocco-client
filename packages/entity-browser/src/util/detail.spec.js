import detail from './detail'

describe('entity-browser', () => {
  describe('util', () => {
    describe('detail', () => {
      describe('getMode', () => {
        it('should return update if id is defined', () => {
          const mode = detail.getMode('12')
          expect(mode).to.eql(detail.modes.UPDATE)
        })

        it('should return create if id is undefined', () => {
          const mode = detail.getMode(undefined)
          expect(mode).to.eql(detail.modes.CREATE)
        })
      })

      describe('getFormExtension', () => {
        it('should detail extension for update mode', () => {
          const mode = detail.getFormExtension(detail.modes.UPDATE)
          expect(mode).to.eql('_detail')
        })

        it('should create extension for create mode', () => {
          const mode = detail.getFormExtension(detail.modes.CREATE)
          expect(mode).to.eql('_create')
        })
      })
    })
  })
})
