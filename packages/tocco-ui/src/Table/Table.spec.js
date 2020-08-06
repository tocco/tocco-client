import React from 'react'
import {shallow} from 'enzyme'

import StyledTable from './StyledTable'
import Table from './Table'

const defaultProps = {
  paginationInfo: {
    totalCount: 1,
    recordsPerPage: 10,
    currentPage: 1
  },
  columns: [],
  data: [],
  onRowClick: () => {}
}

describe('tocco-ui', () => {
  describe('Table', () => {
    test('should render table', () => {
      const wrapper = shallow(<Table {...defaultProps}/>)
      expect(wrapper.find(StyledTable)).to.have.length(1)
    })
  })
})
