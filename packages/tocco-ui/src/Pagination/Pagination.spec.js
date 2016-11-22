import React from 'react'
import Pagination from './Pagination'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Pagination', function() {
    it('should render', () => {
      const wrapper = shallow(<Pagination totalRecords={99} recordsPerPage={5}/>)

      expect(wrapper.find('.tocco-pagination')).to.have.length(1)
    })

    it('should show correct last page', () => {
      const wrapper = shallow(<Pagination totalRecords={99} recordsPerPage={5}/>)
      expect(wrapper.find('#total').text()).to.eql('20')
    })

    it('should call callback on page change', done => {
      const onPageChange = sinon.spy()

      const wrapper = shallow(<Pagination totalRecords={99} recordsPerPage={5} onPageChange={onPageChange}/>)
      wrapper.find('#forwardButton').simulate('click')

      // Necessary since callback is called with debounce. Unfortunately is delays total test runtime.
      setTimeout(() => {
        expect(onPageChange).to.be.calledWith(2)
        done()
      }, 1000)
    })

    it('should disable forward and back button depending on current page', () => {
      const wrapper = shallow(<Pagination totalRecords={20} recordsPerPage={10}/>)

      expect(wrapper.find('#forwardButton')).to.not.be.disabled()
      expect(wrapper.find('#toLastButton')).to.not.be.disabled()
      expect(wrapper.find('#toFirstButton')).to.be.disabled()
      expect(wrapper.find('#backButton')).to.be.disabled()

      wrapper.find('#forwardButton').simulate('click')

      expect(wrapper.find('#forwardButton')).to.be.disabled()
      expect(wrapper.find('#toLastButton')).to.be.disabled()
      expect(wrapper.find('#toFirstButton')).to.not.be.disabled()
      expect(wrapper.find('#backButton')).to.not.be.disabled()

      wrapper.find('#backButton').simulate('click')

      expect(wrapper.find('#forwardButton')).to.not.be.disabled()
      expect(wrapper.find('#toLastButton')).to.not.be.disabled()
      expect(wrapper.find('#toFirstButton')).to.be.disabled()
      expect(wrapper.find('#backButton')).to.be.disabled()
    })
  })
})
