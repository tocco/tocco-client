import React from 'react'
import {IntlStub} from 'tocco-test-util/src/main'
import {shallow} from 'enzyme'
import {Table as UiTable} from 'tocco-ui'

import Table from './Table'

const EMPTY_FUNC = () => {}

const defaultProps = {
  entityCount: 1,
  initialize: EMPTY_FUNC,
  limit: 10,
  columnDefinitions: [],
  changePage: EMPTY_FUNC,
  entities: [],
  intl: IntlStub,
  orderBy: null,
  sorting: []
}

describe('entity-list', () => {
  describe('components', () => {
    describe('Table', () => {
      test('should render table', () => {
        const wrapper = shallow(<Table {...defaultProps}/>)
        expect(wrapper.find(UiTable)).to.have.length(1)
      })
    })
  })
})
