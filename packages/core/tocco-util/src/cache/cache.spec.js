import {
  addShortTerm,
  addLongTerm,
  getShortTerm,
  getLongTerm,
  clearAll,
  clearShortTerm,
  removeLongTerm,
  getObjectCache,
  addObjectCache,
  removeObjectCache
} from './cache'

describe('tocco-util', () => {
  describe('cache', () => {
    beforeEach(() => {
      clearAll()
    })

    describe('add & get', () => {
      test('should return cached longterm value', () => {
        const value = 'Test'
        const type = 'label'
        const id = 'entity.1'

        addLongTerm(type, id, value)

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.eql(value)
      })

      test('should return cached shortterm value', () => {
        const value = 'Test'
        const type = 'label'
        const id = 'entity.1'

        addShortTerm(type, id, value)

        const cachedValue = getShortTerm(type, id)
        expect(cachedValue).to.eql(value)
      })

      test('should return cached object value', () => {
        const value = 'Test'
        const type = 'label'
        const id = 'entity.1'

        addObjectCache(type, id, value)

        const cachedValue = getObjectCache(type, id)
        expect(cachedValue).to.eql(value)
      })

      test('should return undefined on uncached value', () => {
        const type = 'label'
        const id = 'entity.1'

        expect(getLongTerm(type, id)).to.be.undefined
        expect(getShortTerm(type, id)).to.be.undefined
        expect(getObjectCache(type, id)).to.be.undefined
      })

      test('should return undefined if added short term but get on long term', () => {
        const value = 'Test'
        const type = 'label'
        const id = 'entity.1'

        addShortTerm(type, id, value)

        const cachedValue = getLongTerm(type, id)
        expect(cachedValue).to.be.undefined
      })

      test('should return null values', () => {
        const type = 'label'
        const id = 'entity.1'

        addLongTerm(type, id, null)
        expect(getLongTerm(type, id)).to.be.null

        addShortTerm(type, id, null)
        expect(getShortTerm(type, id)).to.be.null

        addObjectCache(type, id, null)
        expect(getObjectCache(type, id)).to.be.null
      })

      test('should cache object', () => {
        const value = {a: 21}
        const type = 'label'
        const id = 'entity.1'

        addLongTerm(type, id, value)
        expect(getLongTerm(type, id).a).to.eql(21)

        addShortTerm(type, id, value)
        expect(getShortTerm(type, id).a).to.eql(21)

        addObjectCache(type, id, value)
        expect(getObjectCache(type, id).a).to.eql(21)
      })

      test('should not cache if __DEV__', () => {
        const value = 'Test'
        const type = 'label'
        const id = 'entity.1'

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
        const id = 'entity.1'

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
        const id = 'entity.1'

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
        const id = 'entity.1'
        const type = 'label'

        addLongTerm(type, id, 'test')
        addShortTerm(type, id, 'test')
        addObjectCache(type, id, 'test')

        clearAll()

        expect(getLongTerm(type, id)).to.be.undefined
        expect(getShortTerm(type, id)).to.be.undefined
        expect(getObjectCache(type, id)).to.be.undefined
      })

      test('should clear short term cache', () => {
        const value = 'test'
        const id = 'entity.1'
        const type = 'label'

        addShortTerm(type, id, value)
        addLongTerm(type, id, value)

        clearShortTerm()

        expect(getShortTerm(type, id)).to.be.undefined
        expect(getLongTerm(type, id)).to.eql(value)
      })
    })

    describe('remove', () => {
      test('should remove single item from long term cache', () => {
        const value1 = 'test1'
        const value2 = 'test2'
        const id1 = 'id.1'
        const id2 = 'id.2'
        const type = 'label'

        addLongTerm(type, id1, value1)
        addLongTerm(type, id2, value2)

        removeLongTerm(type, id1)

        expect(getLongTerm(type, id1)).to.be.undefined
        expect(getLongTerm(type, id2)).to.eql(value2)
      })

      test('should remove single item from object cache', () => {
        const value1 = 'test1'
        const value2 = 'test2'
        const id1 = 'id.1'
        const id2 = 'id.2'
        const type = 'label'

        addObjectCache(type, id1, value1)
        addObjectCache(type, id2, value2)

        removeObjectCache(type, id1)

        expect(getObjectCache(type, id1)).to.be.undefined
        expect(getObjectCache(type, id2)).to.eql(value2)
      })
    })
  })
})
