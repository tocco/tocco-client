import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'
import {ButtonContextProvider} from 'tocco-ui'

import TableContainer from '../../containers/TableContainer'
import ListView from './ListView'

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
    describe('ListView', () => {
      test('should render ', () => {
        const wrapper = shallow(<ListView {...props} />)
        expect(wrapper.find(TableContainer)).to.have.length(1)
        expect(wrapper.find(ButtonContextProvider)).to.have.length(1) // => actions
      })

      test('should not render action bar if not in model', () => {
        const wrapper = shallow(<ListView {...props} formDefinition={formDefinition([table])} />)
        expect(wrapper.find(ButtonContextProvider)).to.have.length(0) // => actions
      })
    })
  })
})
