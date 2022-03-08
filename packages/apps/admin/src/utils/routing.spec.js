import {goBack} from './routing'

describe('admin', () => {
  describe('util', () => {
    describe('goBack', () => {
      test('should remove the right amouts of paths', () => {
        const url = '/e/User/620/detail'
        const result = goBack(url, 2)

        const expected = '/e/User'

        expect(result).to.eql(expected)
      })

      test('should ignore slashes at the end of the url', () => {
        const url = '/e/User/620/detail/'
        const result = goBack(url, 2)

        const expected = '/e/User'

        expect(result).to.eql(expected)
      })
    })
  })
})
