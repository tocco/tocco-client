import React from 'react'
import {IntlStub} from 'tocco-test-util'
import {shallow} from 'enzyme'

import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import ActionContainer from '../../containers/ActionContainer'
import TableContainer from '../../containers/TableContainer'
import ListView from './ListView'

const EMPTY_FUNC = () => {}

const props = {
  initialize: EMPTY_FUNC,
  formDefinition: {
    children: [
      {
        componentType: 'table',
        layoutType: 'table',
        children: []
      },
      {
        id: 'main-action-bar',
        componentType: 'action-bar'
      }
    ]
  },
  intl: IntlStub,
  orderBy: null,
  selectable: true,
  onSelectChange: EMPTY_FUNC,
  selection: [],
  refresh: EMPTY_FUNC,
  currentPageIds: ['1', '4'],
  showSelectionController: true
}

describe('entity-list', () => {
  describe('components', () => {
    describe('ListView', () => {
      test('should render ', () => {
        const wrapper = shallow(<ListView {...props}/>)
        expect(wrapper.find(TableContainer)).to.have.length(1)
        expect(wrapper.find(ActionContainer)).to.have.length(1)
        expect(wrapper.find(SelectionControllerContainer)).to.have.length(1)
      })

      test('should not render actions if flag set to false', () => {
        const wrapper = shallow(<ListView showActions={false} {...props}/>)
        expect(wrapper.find(ActionContainer)).to.have.length(0)
        expect(wrapper.find(SelectionControllerContainer)).to.have.length(1)
      })
    })
  })
})
