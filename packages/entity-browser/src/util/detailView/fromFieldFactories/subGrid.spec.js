import subGridFactory from './subGrid'

describe('entity-browser', () => {
  describe('components', () => {
    describe('FormField', () => {
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
