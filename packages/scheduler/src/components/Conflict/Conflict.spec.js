import React from 'react'
import Conflict from './Conflict'
import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

describe('scheduler', () => {
  describe('components', () => {
    describe('Conflict', () => {
      it('should render return null if conflictstatus is undefined', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} />)
        expect(wrapper.type()).to.be.null
      })

      it('should render return null if conflictstatus is undefined nones', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} conflictStatus="none"/>)
        expect(wrapper.type()).to.be.null
      })

      it('should render a check icon if conflict is accepted', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} conflictStatus="accepted"/>)
        expect(wrapper.find('.fa-check')).to.have.length(1)
      })

      it('should render a times icon if conflict is existing', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} conflictStatus="existing"/>)
        expect(wrapper.find('.fa-times')).to.have.length(1)
      })
    })
  })
})
