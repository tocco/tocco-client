import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import Pagination from './'
import {StyledPaginationButton} from './StyledComponents'

describe('tocco-ui', () => {
  const basicTestProps = {
    totalCount: 1000,
    currentPage: 3,
    recordsPerPage: 10,
    onPageChange: () => {}
  }

  describe('Pagination', () => {
    test('should disable first and second button when on first page', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <Pagination {...basicTestProps} currentPage={1}/>
      )
      const firstButton = wrapper.find(StyledPaginationButton).first()
      expect(firstButton).prop('disabled').to.equal(true)
      const secondButton = wrapper.find(StyledPaginationButton).at(1)
      expect(secondButton).prop('disabled').to.equal(true)
    })

    test('should disable last and second-last button when on last page', () => {
      const lastPage = Math.ceil(basicTestProps.totalCount / basicTestProps.recordsPerPage)
      const wrapper = intlEnzyme.mountWithIntl(
        <Pagination {...basicTestProps} currentPage={lastPage}/>
      )
      const lastButton = wrapper.find(StyledPaginationButton).at(3)
      expect(lastButton).prop('disabled').to.equal(true)
      const secondLastButton = wrapper.find(StyledPaginationButton).at(2)
      expect(secondLastButton).prop('disabled').to.equal(true)
    })

    test('should call callback with correct new page', () => {
      const onChangeSpy = sinon.spy()
      const wrapper = intlEnzyme.mountWithIntl(
        <Pagination {...basicTestProps} onPageChange={onChangeSpy}/>
      )

      const buttonCompName = 'ForwardRef'
      wrapper.findWhere(n => n.name() === buttonCompName && n.prop('icon') === 'chevron-right').simulate('click')
      expect(onChangeSpy).to.be.calledWith(4)
      wrapper.findWhere(n => n.name() === buttonCompName && n.prop('icon') === 'chevron-left').simulate('click')
      expect(onChangeSpy).to.be.calledWith(2)
      wrapper.findWhere(n => n.name() === buttonCompName && n.prop('icon') === 'chevron-double-left').simulate('click')
      expect(onChangeSpy).to.be.calledWith(1)
      wrapper.findWhere(n => n.name() === buttonCompName && n.prop('icon') === 'chevron-double-right').simulate('click')
      expect(onChangeSpy).to.be.calledWith(100)
    })
  })
})
