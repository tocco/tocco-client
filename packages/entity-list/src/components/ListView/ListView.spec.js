import React from 'react'
import ListView from './ListView'
import {BootstrapTable} from 'react-bootstrap-table'
import {IntlStub} from 'tocco-test-util'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

const defaultProps = {
  entityCount: 1,
  initialize: EMPTY_FUNC,
  limit: 10,
  columnDefinitions: [],
  changePage: EMPTY_FUNC,
  setSearchTerm: EMPTY_FUNC,
  entities: [],
  intl: IntlStub,
  orderBy: null
}

describe('entity-list', () => {
  describe('components', () => {
    describe('ListView', () => {
      it('should render bootstrap table', () => {
        const wrapper = shallow(<ListView {...defaultProps}/>)
        expect(wrapper.find(BootstrapTable)).to.have.length(1)
      })
    })
  })
})
