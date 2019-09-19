import {add, get} from './cache'

describe('tocco-util', () => {
  describe('cache', () => {
    describe('typeValueExtractor', () => {
      test('should return cached value', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        add(type, id, value)

        const cachedValue = get(type, id)
        expect(cachedValue).to.eql(value)
      })

      test('should return null on uncached value', () => {
        const type = 'label'
        const id = 1

        const cachedValue = get(type, id)
        expect(cachedValue).to.be.null
      })

      test('should cache object', () => {
        const value = {a: 21}
        const type = 'label'
        const id = 1

        add(type, id, value)

        const cachedValue = get(type, id)
        expect(cachedValue.a).to.eql(21)
      })
    })
  })
})
