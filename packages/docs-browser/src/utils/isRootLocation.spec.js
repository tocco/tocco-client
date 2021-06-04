import isRootLocation from './isRootLocation'

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('utils', () => {
        describe('isRootLocation', () => {
          test('should return true if root location without trailing slash', () => {
            expect(isRootLocation('/docs')).to.be.true
          })

          test('should return true if root location with trailing slash', () => {
            expect(isRootLocation('/docs/')).to.be.true
          })

          test('should return false if not root location', () => {
            expect(isRootLocation('/docs/folder/346/list')).to.be.false
          })
        })
      })
    })
  })
})
