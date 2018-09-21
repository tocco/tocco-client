import React from 'react'
import {IntlStub} from 'tocco-test-util'
import {shallow} from 'enzyme'
import {actions} from 'tocco-util'

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
        componentType: 'action',
        actionType: 'simple'
      },
      {
        componentType: 'action',
        actionType: 'simple'
      }
    ]
  },
  intl: IntlStub,
  orderBy: null,
  selectable: true,
  onSelectChange: EMPTY_FUNC,
  selection: [],
  refresh: EMPTY_FUNC,
  currentPageIds: ['1', '4']
}

describe('entity-list', () => {
  describe('components', () => {
    describe('ListView', () => {
      test('should render ', () => {
        const wrapper = shallow(<ListView {...props}/>)
        expect(wrapper.find(TableContainer)).to.have.length(1)
        expect(wrapper.find(actions.Action)).to.have.length(2)
      })
    })
  })
})
