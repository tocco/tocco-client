import parseUrl from './parseUrl'

describe('entity-browser', () => {
  describe('util', () => {
    describe('detailView', () => {
      describe('parseUrl', () => {
        test('should return no model paths and the target entity id if no relation steps', () => {
          const url = '/detail/2'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: [],
            entityId: '2',
            parentUrl: '/'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should return the model paths and the target entity id for one relation step', () => {
          const url = '/detail/2/relDummySubGrid/3'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: ['relDummySubGrid'],
            entityId: '3',
            parentUrl: '/detail/2'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should return the model paths and the target entity id for multiple relation steps', () => {
          const url = '/detail/2/relFoo/3/relBar/4/relFooBar/5'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: ['relFoo', 'relBar', 'relFooBar'],
            entityId: '5',
            parentUrl: '/detail/2/relFoo/3/relBar/4'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should return undefined id if create url', () => {
          const url = '/detail/'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: [],
            entityId: undefined,
            parentUrl: '/'
          }

          expect(result).to.eql(expectedResult)
        })

        test('should return undefined id if create url with multiple relation steps', () => {
          const url = '/detail/2/relFoo/3/relBar/4/relFooBar'

          const result = parseUrl(url)

          const expectedResult = {
            modelPaths: ['relFoo', 'relBar', 'relFooBar'],
            entityId: undefined,
            parentUrl: '/detail/2/relFoo/3/relBar/4'
          }

          expect(result).to.eql(expectedResult)
        })
      })
    })
  })
})
