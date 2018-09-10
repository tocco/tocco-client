import React from 'react'
import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'
import {Icon} from 'tocco-ui'

import Conflict from './Conflict'

describe('scheduler', () => {
  describe('components', () => {
    describe('Conflict', () => {
      it('should return null if conflictstatus is undefined', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} />)
        expect(wrapper.type()).to.be.null
      })

      it('should return null if conflictstatus is none', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} conflictStatus="none"/>)
        expect(wrapper.type()).to.be.null
      })

      it('should render a check icon if conflict is accepted', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} conflictStatus="accepted"/>)
        expect(wrapper.find(Icon).prop('icon')).to.be.equal('check')
      })

      it('should render a times icon if conflict is existing', () => {
        const wrapper = shallow(<Conflict intl={IntlStub} conflictStatus="existing"/>)
        expect(wrapper.find(Icon).prop('icon')).to.be.equal('times')
      })
    })
  })
})
