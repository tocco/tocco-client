import React from 'react'
import ValidationRules from './ValidationRules'
import {SignalListItem} from 'tocco-ui/src/SignalList'
import {mount, shallow} from 'enzyme'

describe('login', () => {
  describe('components', () => {
    describe('ValidationRules', () => {
      it('should render empty ul if no rules', () => {
        const wrapper = mount(<ValidationRules rules={[]}/>)
        expect(wrapper.find('ul')).to.have.length(1)
        expect(wrapper.find('li')).to.have.length(0)
      })

      it('should render rules w/o status if no errors object given', () => {
        const rules = [{
          name: 'LENGTH',
          message: 'Must have at least 8 characters'
        }, {
          name: 'CHARACTERS_DIGITS',
          message: 'Must have at least 1 digit'
        }]
        const wrapper = shallow(<ValidationRules rules={rules}/>)
        expect(wrapper.containsAllMatchingElements([
          <SignalListItem condition={null} label="Must have at least 8 characters" key="1"/>,
          <SignalListItem condition={null} label="Must have at least 1 digit" key="2"/>
        ])).to.equal(true)
      })

      it('should render rules with success status if errors object empty', () => {
        const rules = [{
          name: 'LENGTH',
          message: 'Must have at least 8 characters'
        }, {
          name: 'CHARACTERS_DIGITS',
          message: 'Must have at least 1 digit'
        }]
        const errors = {}
        const wrapper = shallow(<ValidationRules rules={rules} errors={errors}/>)
        expect(wrapper.containsAllMatchingElements([
          <SignalListItem condition="success" label="Must have at least 8 characters" key="1"/>,
          <SignalListItem condition="success" label="Must have at least 1 digit" key="2"/>
        ])).to.equal(true)
      })

      it('should render rules with error status if errors object not empty', () => {
        const rules = [{
          name: 'LENGTH',
          message: 'Must have at least 8 characters'
        }, {
          name: 'CHARACTERS_DIGITS',
          message: 'Must have at least 1 digit'
        }]
        const errors = {
          LENGTH: true
        }
        const wrapper = shallow(<ValidationRules rules={rules} errors={errors}/>)
        expect(wrapper.containsAllMatchingElements([
          <SignalListItem condition="danger" label="Must have at least 8 characters" key="1"/>,
          <SignalListItem condition="success" label="Must have at least 1 digit" key="2"/>
        ])).to.equal(true)
      })

      it('should render rules with error status and custom message', () => {
        const rules = [{
          name: 'LENGTH',
          message: 'Must have at least 8 characters'
        }, {
          name: 'CHARACTERS_DIGITS',
          message: 'Must have at least 1 digit'
        }]
        const errors = {
          LENGTH: 'Two more characters required!'
        }
        const wrapper = shallow(<ValidationRules rules={rules} errors={errors}/>)
        expect(wrapper.containsAllMatchingElements([
          <SignalListItem condition="danger" label="Two more characters required!" key="1"/>,
          <SignalListItem condition="success" label="Must have at least 1 digit" key="2"/>
        ])).to.equal(true)
      })
    })
  })
})
