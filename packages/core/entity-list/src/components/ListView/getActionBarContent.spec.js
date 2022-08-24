import {getActionBarContent} from './getActionBarContent'

const table = {
  componentType: 'table',
  layoutType: 'table',
  children: []
}

const mainActionBar = {
  id: 'main-action-bar',
  componentType: 'action-bar',
  children: []
}

const formDefinition = children => ({
  children
})

const props = {
  formDefinition: formDefinition([table, mainActionBar]),
  showSelectionController: true,
  showActions: true
}

describe('entity-list', () => {
  describe('components', () => {
    describe('ListView', () => {
      describe('getActionBarContent', () => {
        test('should get action bar content ', () => {
          const {content} = getActionBarContent(props)
          expect(content).to.have.length(2)
        })

        test('should not render actions if flag set to false', () => {
          const {content} = getActionBarContent({...props, showActions: false})
          expect(content).to.have.length(1)
          expect(content[0].key).to.eql('selectionController')
        })

        test('should not render actions if flag set to false', () => {
          const {content} = getActionBarContent({...props, showSelectionController: false})
          expect(content).to.have.length(1)
          expect(content[0].key).to.eql('listAction-main-action-bar')
        })
      })
    })
  })
})
