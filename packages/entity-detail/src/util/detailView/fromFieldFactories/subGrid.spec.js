import subGridFactory from './subGrid'

describe('entity-detail', () => {
  describe('util', () => {
    describe('detailView', () => {
      describe('fieldTypeFactories', () => {
        describe('subGrid', () => {
          it('should return a component', () => {
            const factory = subGridFactory()
            const grid = factory({children: [], name: 'relFoo'}, {}, {}, {}, {})
            expect(grid).to.not.be.null
          })
        })
      })
    })
  })
})
