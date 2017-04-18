import {atMostOne} from './utils'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('utils', () => {
      describe('atMostOne', () => {
        it('should return null if null given', () => {
          expect(atMostOne(null)).to.be.null
        })

        it('should return null if empty array given', () => {
          expect(atMostOne([])).to.be.null
        })

        it('should return only item if array with one item given', () => {
          expect(atMostOne(['onlyItem'])).to.eql('onlyItem')
        })

        it('should throw an error if array with multiple items given', () => {
          expect(() => atMostOne(['item1', 'item2'])).to.throw('Expected at most one item in array: item1, item2')
        })
      })
    })
  })
})
