import {getParent, getTql} from './DocsView'

describe('docs-browser', () => {
  describe('components', () => {
    describe('DocsView', () => {
      describe('getParent', () => {
        test('should return null if no path match', () => {
          const match = {
            params: {}
          }
          expect(getParent(match)).to.equal(null)
        })

        test('should return parent if has path match', () => {
          const match = {
            params: {
              model: 'folder',
              key: '9345'
            }
          }
          expect(getParent(match)).to.eql({
            model: 'Docs_list_item',
            key: 'Folder/9345'
          })
        })
      })

      describe('getTql', () => {
        test('should return tql if is root level and domain types are set', () => {
          const parent = null
          const domainTypes = ['public_file_repository', 'internal_file_repository']
          expect(getTql(parent, domainTypes)).to.equal(
            'exists(relDomain_type where IN(unique_id, "public_file_repository","internal_file_repository"))'
          )
        })

        test('should return no tql if is not root level and domain types are set', () => {
          const parent = {
            model: 'Docs_list_item',
            key: 'Folder/9345'
          }
          const domainTypes = ['public_file_repository', 'internal_file_repository']
          expect(getTql(parent, domainTypes)).to.equal(null)
        })

        test('should return no tql if is root level and no domain types are set', () => {
          const parent = {
            model: 'Docs_list_item',
            key: 'Folder/9345'
          }
          const domainTypes = null
          expect(getTql(parent, domainTypes)).to.equal(null)
        })
      })
    })
  })
})
