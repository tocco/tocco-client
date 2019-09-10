import {getOrFirst} from './helpers'

describe('tocco-util', () => {
  describe('helpers', () => {
    describe('getOrFirst', () => {
      test('should return simple value', () => {
        expect(getOrFirst(1)).to.eql(1)
        expect(getOrFirst('test')).to.eql('test')
        expect(getOrFirst({a: 1})).to.eql({a: 1})
        expect(getOrFirst(null)).to.eql(null)
      })

      test('should return first element of array', () => {
        const array = [
          11, 22, 33
        ]
        expect(getOrFirst(array)).to.eql(11)
      })

      test('should return empty array if given empty array', () => {
        const array = []
        expect(getOrFirst(array)).to.eql([])
      })
    })
  })
})
