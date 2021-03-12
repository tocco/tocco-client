import {
  addShortTerm,
  addMediumTerm,
  addLongTerm,
  getShortTerm,
  getMediumTerm,
  getLongTerm,
  clearAll,
  clearShortTerm,
  removeLongTerm,
  clearMediumTerm
} from './cache'

describe('tocco-util', () => {
  describe('cache', () => {
    beforeEach(() => {
      clearAll()
    })

    describe('add & get', () => {
      test('should return cached value', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        addLongTerm(type, id, value)

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.eql(value)
      })

      test('should return undefined on uncached value', () => {
        const type = 'label'
        const id = 1

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.be.undefined
      })

      test('should return undefined if added short term but get on long term', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        addShortTerm(type, id, value)

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.be.undefined
      })

      test('should return null values', () => {
        const type = 'label'
        const id = 1
        addLongTerm(type, id, null)
        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.be.null
      })

      test('should cache object', () => {
        const value = {a: 21}
        const type = 'label'
        const id = 1

        addLongTerm(type, id, value)

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue.a).to.eql(21)
      })

      test('should not cache if __DEV__', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        const resetDEVValue = __DEV__
        // eslint-disable-next-line no-global-assign
        __DEV__ = true
        addLongTerm(type, id, value)

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.eql(undefined)

        // eslint-disable-next-line no-global-assign
        __DEV__ = resetDEVValue
      })

      test('should not cache if nice env is not production', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        global.app = {
          getRunEnv: () => 'DEVELOPMENT'
        }

        addLongTerm(type, id, value)
        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.eql(undefined)
      })

      test('should cache if nice env is production', () => {
        const value = 'Test'
        const type = 'label'
        const id = 1

        global.app = {
          getRunEnv: () => 'PRODUCTION'
        }

        addLongTerm(type, id, value)
        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.eql(value)
      })
    })

    describe('clear', () => {
      test('should clear all cache', () => {
        const id = 'id'
        const type = 'label'

        addLongTerm(type, id, 'test')
        clearAll()
        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.be.undefined
      })

      test('should clear short term cache', () => {
        const value = 'test'
        const id = 'id'
        const type = 'label'

        addShortTerm(type, id, value)
        addLongTerm(type, id, value)
        clearShortTerm()
        const cachedValueShortTerm = getShortTerm(type, id)
        const cachedValueLongTerm = getLongTerm(type, id)
        expect(cachedValueShortTerm).to.be.undefined
        expect(cachedValueLongTerm).to.eql(value)
      })

      test('should clear medium term cache', () => {
        addMediumTerm('form', 'id', 'form')
        addMediumTerm('menu', 'id', 'menu')
        addLongTerm('model', 'id', 'model')
        clearMediumTerm()
        expect(getMediumTerm('form', 'id')).to.be.undefined
        expect(getMediumTerm('menu', 'id')).to.be.undefined
        expect(getLongTerm('model', 'id')).to.eql('model')
      })
    })

    describe('remove', () => {
      test('should remove single item from cache', () => {
        const value1 = 'test1'
        const value2 = 'test2'
        const id1 = 'id1'
        const id2 = 'id2'
        const type = 'label'

        addLongTerm(type, id1, value1)
        addLongTerm(type, id2, value2)
        removeLongTerm(type, id1)
        const cachedValue1 = getLongTerm(type, id1)
        const cachedValue2 = getLongTerm(type, id2)
        expect(cachedValue1).to.be.undefined
        expect(cachedValue2).to.eql(value2)
      })
    })
  })
})
