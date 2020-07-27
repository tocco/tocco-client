import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import Pagination from './'
import Button from '../Button'

describe('tocco-ui', () => {
  const basicTestProps = {
    totalCount: 1000,
    currentPage: 3,
    recordsPerPage: 10,
    onPageChange: () => {}
  }

  describe('Pagination', () => {
    test('should show all 2 navigation buttons if at start', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <Pagination {...basicTestProps} currentPage={1}/>
      )
      expect(wrapper.find(Button)).to.have.length(2)
    })

    test('should show all 2 navigation buttons if at end', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <Pagination {...basicTestProps} currentPage={100}/>
      )
      expect(wrapper.find(Button)).to.have.length(2)
    })

    test('should show all 4 navigation buttons if not at start or beginning', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <Pagination {...basicTestProps}/>
      )
      expect(wrapper.find(Button)).to.have.length(4)
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
