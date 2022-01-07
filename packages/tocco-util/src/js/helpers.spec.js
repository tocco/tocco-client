import {copyToClipboard, getOrFirst, roundDecimalPlaces} from './helpers'

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
        const array = [11, 22, 33]
        expect(getOrFirst(array)).to.eql(11)
      })

      test('should return empty array if given empty array', () => {
        const array = []
        expect(getOrFirst(array)).to.eql([])
      })
    })

    describe('roundDecimalPlaces', () => {
      test('should round up to two decimal places', () => {
        const expectedResult = 3.27
        expect(roundDecimalPlaces(3.269, 2)).to.be.equal(expectedResult)
      })

      test('should round down to two decimal places', () => {
        const expectedResult = 3.26
        expect(roundDecimalPlaces(3.264, 2)).to.be.equal(expectedResult)
      })

      test('should round to three decimal places', () => {
        const expectedResult = 3.267
        expect(roundDecimalPlaces(3.266666, 3)).to.be.equal(expectedResult)
      })

      test('should round to zero decimal places', () => {
        const expectedResult = 3
        expect(roundDecimalPlaces(3.266666, 0)).to.be.equal(expectedResult)
      })
    })

    describe('copyToClipboard', () => {
      beforeEach(() => {
        navigator.clipboard = undefined
      })

      test('should copy text to clipboard', async () => {
        const text = 'abc'
        const writeTextSpy = sinon.spy()
        navigator.clipboard = {
          writeText: writeTextSpy
        }

        try {
          await copyToClipboard(text)
        } catch (err) {
          expect.fail('should not throw any errors')
        }

        expect(writeTextSpy).to.have.been.calledWith(text)
      })

      test('should fail when navigator.clipoard is not available', async () => {
        const text = 'abc'

        try {
          await copyToClipboard(text)
          expect.fail('should throw an error')
        } catch (err) {
          expect(err.message).to.equal('navigator.clipboard API not available')
        }
      })
    })
  })
})
