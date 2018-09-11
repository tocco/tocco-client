import {mount, shallow} from 'enzyme'
import React from 'react'

import Button from '../Button'
import {Span} from '../Typography'
import Pagination from './Pagination'

describe('tocco-ui', function() {
  describe('Pagination', function() {
    it('should render', () => {
      const wrapper = mount(<Pagination totalRecords={99} recordsPerPage={5}/>)
      expect(wrapper.find(Button)).to.have.length(4)
      expect(wrapper.find(Span)).to.have.length(1)
    })

    it('should show correct last page', () => {
      const wrapper = mount(<Pagination totalRecords={99} recordsPerPage={5}/>)
      expect(wrapper.find(Span).text()).to.equal(' / 20')
    })

    it('should recalculate on prop change', () => {
      const wrapper = mount(<Pagination totalRecords={99} recordsPerPage={5}/>)
      wrapper.setProps({recordsPerPage: 10})
      expect(wrapper.find(Span).text()).to.equal(' / 10')
    })

    it('should call callback on page change', done => {
      const onPageChange = sinon.spy()
      const wrapper = shallow(<Pagination totalRecords={99} recordsPerPage={5} onPageChange={onPageChange}/>)
      wrapper.find(Button).at(2).simulate('click')

      // Necessary since callback is called with debounce. Unfortunately is delays total test runtime.
      setTimeout(() => {
        expect(onPageChange).to.be.calledWith(2)
        done()
      }, 300)
    })

    it('should disable forward and back button depending on current page', () => {
      const wrapper = mount(<Pagination totalRecords={30} recordsPerPage={10}/>)
      expect(wrapper.find(Button).at(0)).to.be.disabled()
      expect(wrapper.find(Button).at(1)).to.be.disabled()
      expect(wrapper.find(Button).at(2)).to.not.be.disabled()
      expect(wrapper.find(Button).at(3)).to.not.be.disabled()

      wrapper.find(Button).at(3).simulate('click')
      expect(wrapper.find(Button).at(0)).to.not.be.disabled()
      expect(wrapper.find(Button).at(1)).to.not.be.disabled()
      expect(wrapper.find(Button).at(2)).to.be.disabled()
      expect(wrapper.find(Button).at(3)).to.be.disabled()

      wrapper.find(Button).at(1).simulate('click')
      expect(wrapper.find(Button).at(0)).to.not.be.disabled()
      expect(wrapper.find(Button).at(1)).to.not.be.disabled()
      expect(wrapper.find(Button).at(2)).to.not.be.disabled()
      expect(wrapper.find(Button).at(3)).to.not.be.disabled()

      wrapper.find(Button).at(0).simulate('click')
      expect(wrapper.find(Button).at(0)).to.be.disabled()
      expect(wrapper.find(Button).at(1)).to.be.disabled()
      expect(wrapper.find(Button).at(2)).to.not.be.disabled()
      expect(wrapper.find(Button).at(3)).to.not.be.disabled()
    })
  })
})
