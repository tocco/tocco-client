import {assertObjectValuesMatchOtherObjectKeys} from '../utilStyles'

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('assertObjectValuesMatchOtherObjectKeys', () => {
      const base = {
        HEART: 'heart',
        SHOULDER: 'shoulder',
        HEAD: 'head'
      }

      const correct = {
        shoulder: 's',
        head: 'hd',
        heart: 'ht'
      }

      const tooShort1 = {
        shoulder: 's',
        heart: 'ht'
      }

      const tooShort2 = {
        shoulder: 's'
      }

      const tooLong1 = {
        shoulder: 's',
        head: 'hd',
        heart: 'ht',
        belly: 'b'
      }

      const tooLong2 = {
        arm: 'a',
        shoulder: 's',
        head: 'hd',
        heart: 'ht',
        belly: 'b'
      }

      const misspelled = {
        Shoulder: 's',
        head: 'hd',
        heart: 'ht'
      }

      const misspelled2 = {
        schuldär: 's',
        head: 'hd',
        heart: 'ht'
      }

      const misspelled3 = {
        schuldär: 's',
        head: 'hd',
        arm: 'a'
      }

      test('should be correct independent of alphabetically order', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, correct)).to.be.true
      })

      test('should be incorrect caused by incomplete reuse', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, tooShort1)).to.be.false
      })

      test('should be incorrect caused by incomplete reuse', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, tooShort2)).to.be.false
      })

      test('should be incorrect caused by to many keys in map', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, tooLong1)).to.be.false
      })

      test('should be incorrect caused by to many keys in map', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, tooLong2)).to.be.false
      })

      test('should be incorrect caused by misspelled key', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, misspelled)).to.be.false
      })

      test('should be incorrect caused by misspelled key', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, misspelled2)).to.be.false
      })

      test('should be incorrect caused by misspelled key', () => {
        expect(assertObjectValuesMatchOtherObjectKeys(base, misspelled3)).to.be.false
      })
    })
  })
})
