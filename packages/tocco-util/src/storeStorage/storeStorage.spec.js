import {get, set} from './storeStorage'

describe('tocco-util', () => {
  describe('storeStorage', () => {
    describe('storeStorage', () => {
      it('should store and return a store', () => {
        const exampleStore = {a: 1}
        set('example', exampleStore)

        expect(get('example')).to.eql(exampleStore)
      })

      it('should return undefined if store not set', () => {
        expect(get('example2')).to.be.undefined
      })
    })
  })
})
