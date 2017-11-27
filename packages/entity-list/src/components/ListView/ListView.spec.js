import React from 'react'
import ListView from './ListView'
import {IntlStub} from 'tocco-test-util'
import {shallow} from 'enzyme'
import TableContainer from '../../containers/TableContainer'

const EMPTY_FUNC = () => {}

const props = {
  initialize: EMPTY_FUNC,
  formDefinition: {
    children: [
      {
        type: 'ch.tocco.nice2.model.form.components.table.Table',
        children: []
      },
      {
        type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
      },
      {
        type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
      }
    ]
  },
  intl: IntlStub,
  orderBy: null,
  selectable: true,
  onSelectChange: EMPTY_FUNC,
  selection: []
}

describe('entity-list', () => {
  describe('components', () => {
    describe('ListView', () => {
      it('should render ', () => {
        const wrapper = shallow(<ListView {...props}/>)
        expect(wrapper.find(TableContainer)).to.have.length(1)
        expect(wrapper.find('.action')).to.have.length(2)
      })
    })
  })
})
