import parseUrl from './parseUrl'

describe('entity-browser', () => {
  describe('util', () => {
    describe('detailView', () => {
      describe('parseUrl', () => {
        it('should return no model paths and the target entity id if no relation steps', () => {
          const url = '/detail/2'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: [],
            entityId: '2'
          }

          expect(result).to.eql(expectedResult)
        })

        it('should return the model paths and the target entity id for one relation step', () => {
          const url = '/detail/2/relDummySubGrid/3'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: ['relDummySubGrid'],
            entityId: '3'
          }

          expect(result).to.eql(expectedResult)
        })

        it('should return the model paths and the target entity id for multiple relation steps', () => {
          const url = '/detail/2/relFoo/3/relBar/4/relFooBar/5'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: ['relFoo', 'relBar', 'relFooBar'],
            entityId: '5'
          }

          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
