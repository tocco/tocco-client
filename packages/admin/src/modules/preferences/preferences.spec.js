import {transformValues} from './preferences'

describe('admin', () => {
  describe('modules', () => {
    describe('preferences', () => {
      describe('preferences', () => {
        describe('transformValues', () => {
          test('should transform true string', () => {
            expect(transformValues({test: 'true'})).to.deep.equal({test: true})
          })

          test('should transform false string', () => {
            expect(transformValues({test: 'false'})).to.deep.equal({test: false})
          })

          test('should leave other values', () => {
            const input = {test: '1', test2: 'test'}
            expect(transformValues(input)).to.deep.equal(input)
          })
        })
      })
    })
  })
})
