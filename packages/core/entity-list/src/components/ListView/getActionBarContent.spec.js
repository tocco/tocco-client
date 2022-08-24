import {IntlStub} from 'tocco-test-util'

import {getActionBarContent} from './getActionBarContent'

const EMPTY_FUNC = () => {}

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
  initialize: EMPTY_FUNC,
  formDefinition: formDefinition([table, mainActionBar]),
  intl: IntlStub,
  orderBy: null,
  selectable: true,
  onSelectChange: EMPTY_FUNC,
  selection: [],
  refresh: EMPTY_FUNC,
  currentPageIds: ['1', '4'],
  showSelectionController: true,
  columnDisplayPreferences: {},
  preferencesLoaded: true
}

describe('entity-list', () => {
  describe('components', () => {
    describe('ActionBarContent', () => {
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
