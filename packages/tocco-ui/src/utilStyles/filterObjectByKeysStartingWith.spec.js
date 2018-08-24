import {filterObjectByKeysStartingWith} from '../utilStyles'

const input = {
  'data-a': 'A',
  'data-b': 'B',
  'datac': 'C',
  'aria-d': 'D',
  'aria-e': 'E',
  'ariaf': 'F',
  'custom-g': 'G',
  'unknown-h': 'H'
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('filterObjectByKeysStartingWith', () => {
      it('should return an empty object', () => {
        expect(filterObjectByKeysStartingWith(input)).to.deep.equal({})
      })

      it('should return an object containing only keys starting with "data-" and "aira-"', () => {
        expect(filterObjectByKeysStartingWith(input, ['data-', 'aria-'])).to.deep.equal({
          'data-a': 'A',
          'data-b': 'B',
          'aria-d': 'D',
          'aria-e': 'E'
        })
      })

      it('should return an object containing only keys starting with "aria" and "custom', () => {
        expect(filterObjectByKeysStartingWith(input, ['custom-', 'aria'])).to.deep.equal({
          'aria-d': 'D',
          'aria-e': 'E',
          'ariaf': 'F',
          'custom-g': 'G'
        })
      })
    })
  })
})
