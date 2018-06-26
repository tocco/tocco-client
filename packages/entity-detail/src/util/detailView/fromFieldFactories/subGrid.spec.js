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

          it('should pass limit from formModel', () => {
            const factory = subGridFactory()
            const grid = factory({children: [], name: 'relFoo', limit: 25}, {}, {}, {}, {})
            expect(grid.props.limit).to.equal(25)
          })

          it('should pass undefined as limit if null in formModel', () => { // otherwise defaultProp won't be used
            const factory = subGridFactory()
            const grid = factory({children: [], name: 'relFoo', limit: null}, {}, {}, {}, {})
            expect(grid.props.limit).to.be.undefined
          })
        })
      })
    })
  })
})
