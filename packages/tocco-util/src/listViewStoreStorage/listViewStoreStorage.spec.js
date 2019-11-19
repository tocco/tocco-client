import {clear, removeStoresBelow, getStore, setStore} from './listViewStoreStorage'

describe('tocco-util', () => {
  describe('listViewStoreStorage', () => {
    afterEach(() => {
      clear()
    })

    describe('setStore', () => {
      test('should set a store', () => {
        const exampleStore = {a: 1}
        setStore(0, '/e/User/list', exampleStore)

        expect(getStore(0, '/e/User/list')).to.eql(exampleStore)
      })

      test('should set a store per level', () => {
        const store1 = {a: 1}
        const store2 = {a: 2}

        setStore(0, '/e/User/list', store1)
        setStore(1, '/e/User/1/relRecipient_email_archive/list', store2)

        expect(getStore(0, '/e/User/list')).to.eql(store1)
        expect(getStore(1, '/e/User/1/relRecipient_email_archive/list')).to.eql(store2)
      })

      test('should override an existing store', () => {
        const store1 = {a: 1}
        const store2 = {a: 2}

        setStore(0, '/e/User/list', store1)
        setStore(0, '/e/User/list', store2)

        expect(getStore(0, '/e/User/list')).to.eql(store2)
      })
    })

    describe('removeStoresBelow', () => {
      test('should remove the stores below the given level (given level remains untouched)', () => {
        const store1 = {a: 1}
        const store2 = {a: 2}

        setStore(0, '/e/User/list', store1)
        setStore(1, '/e/User/1/relRecipient_email_archive/list', store2)

        removeStoresBelow(0)

        expect(getStore(0, '/e/User/list')).to.eql(store1)
        expect(getStore(1, '/e/User/1/relRecipient_email_archive/list')).to.eql(null)
      })
    })

    describe('clear', () => {
      test('should remove all stores', () => {
        const store1 = {a: 1}
        const store2 = {a: 2}

        setStore(0, '/e/User/list', store1)
        setStore(1, '/e/User/1/relRecipient_email_archive/list', store2)

        clear()

        expect(getStore(0, '/e/User/list')).to.eql(null)
        expect(getStore(1, '/e/User/1/relRecipient_email_archive/list')).to.eql(null)
      })
    })

    describe('getStore', () => {
      test('should return null if not found', () => {
        expect(getStore(0, '/e/User/list')).to.eql(null)
      })

      test('should return null if path does not match', () => {
        const store = {a: 2}

        setStore(0, '/e/Address/list', store)

        expect(getStore(0, '/e/User/list')).to.eql(null)
      })
    })
  })
})
