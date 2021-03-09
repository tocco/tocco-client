import getNode from './getNode'

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('utils', () => {
        describe('getNode', () => {
          test('should return resource node', () => {
            expect(getNode('/docs/doc/439/detail')).to.eql({
              model: 'Resource',
              key: '439'
            })
          })

          test('should return folder node', () => {
            expect(getNode('/docs/folder/2353/list')).to.eql({
              model: 'Folder',
              key: '2353'
            })
          })

          test('should return domain node', () => {
            expect(getNode('/docs/domain/348/list')).to.eql({
              model: 'Domain',
              key: '348'
            })
          })

          test('should return null if not a node path', () => {
            expect(getNode('/docs/asdf')).to.be.null
          })
        })
      })
    })
  })
})
