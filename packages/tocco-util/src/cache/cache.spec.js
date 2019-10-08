import {add, get, clear} from './cache'

describe('tocco-util', () => {
  describe('cache', () => {
    beforeEach(() => {
      clear()
    })

    describe('add & get', () => {
      test('should return cached value', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        add(type, id, value)

        const cachedValue = get(type, id)
        expect(cachedValue).to.eql(value)
      })

      test('should return undefined on uncached value', () => {
        const type = 'label'
        const id = 1

        const cachedValue = get(type, id)
        expect(cachedValue).to.be.undefined
      })

      test('should return null values', () => {
        const type = 'label'
        const id = 1
        add(type, id, null)
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

    describe('clear', () => {
      test('should clear cache', () => {
        const id = 'id'
        const type = 'label'

        add(type, id, 'test')
        clear()
        const cachedValue = get(type, id)
        expect(cachedValue).to.be.undefined
      })
    })
  })
})
