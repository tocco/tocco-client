import {getParent, getTql, getFormName, getDefaultLocation} from './DocsView'

describe('docs-browser', () => {
  describe('components', () => {
    describe('DocsView', () => {
      describe('getParent', () => {
        test('should return null if no path match', () => {
          const match = {
            params: {}
          }
          expect(getParent(match.params)).to.equal(null)
        })

        test('should return parent if has path match', () => {
          const match = {
            params: {
              model: 'folder',
              key: '9345'
            }
          }
          expect(getParent(match.params)).to.eql({
            model: 'Docs_list_item',
            key: 'Folder/9345'
          })
        })
      })

      describe('getTql', () => {
        test('should return tql if domain types are given', () => {
          const domainTypes = ['public_file_repository', 'internal_file_repository']
          expect(getTql(domainTypes)).to.equal(
            'exists(relDomain_type where IN(unique_id, "public_file_repository","internal_file_repository"))'
          )
        })

        test('should return no tql if no domain types are null', () => {
          const domainTypes = null
          expect(getTql(domainTypes)).to.equal(null)
        })

        test('should return no tql if no domain types are empty', () => {
          const domainTypes = []
          expect(getTql(domainTypes)).to.equal(null)
        })
      })

      describe('getFormName', () => {
        test('should return "Docs_list_item" if parent is given', () => {
          const parent = {}
          const keys = null
          expect(getFormName(parent, keys)).to.equal('Docs_list_item')
        })

        test('should return "Root_docs_list_item_specific" if keys are given', () => {
          const parent = null
          const keys = ['235']
          expect(getFormName(parent, keys)).to.equal('Root_docs_list_item_specific')
        })

        test('should return "Root_docs_list_item" if neither parent and keys are given', () => {
          const parent = null
          const keys = null
          expect(getFormName(parent, keys)).to.equal('Root_docs_list_item')
        })
      })

      describe('getDefaultLocation', () => {
        test('Domain', () => {
          const key = '1'
          expect(getDefaultLocation('Domain', key)).to.equal(`/docs/domain/${key}/list`)
        })

        test('Folder', () => {
          const key = '1'
          expect(getDefaultLocation('Folder', key)).to.equal(`/docs/folder/${key}/list`)
        })

        test('Resource', () => {
          const key = '1'
          expect(getDefaultLocation('Resource', key)).to.equal(`/docs/doc/${key}/detail`)
        })

        test('invalid model', () => {
          expect(() => getDefaultLocation('User', '1')).to.throw('Unexpected model: User')
        })
      })
    })
  })
})
