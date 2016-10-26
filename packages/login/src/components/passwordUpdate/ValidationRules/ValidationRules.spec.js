import React from 'react'
import ValidationRules, {Rule} from './ValidationRules'
import {mount, render, shallow} from 'enzyme'

describe('login', () => {
  describe('components', () => {
    describe('ValidationRules', () => {
      it('should render empty div if no rules', () => {
        const wrapper = shallow(<ValidationRules rules={[]}/>)
        expect(wrapper.equals(<div className="ValidationRules"/>)).to.equal(true)
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
          <Rule message="Must have at least 8 characters"/>,
          <Rule message="Must have at least 1 digit"/>,
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
          <Rule message="Must have at least 8 characters" className="text-success"/>,
          <Rule message="Must have at least 1 digit" className="text-success"/>,
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
          <Rule message="Must have at least 8 characters" className="text-danger"/>,
          <Rule message="Must have at least 1 digit" className="text-success"/>,
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
          LENGTH: "Two more characters required!"
        }
        const wrapper = shallow(<ValidationRules rules={rules} errors={errors}/>)
        expect(wrapper.containsAllMatchingElements([
          <Rule message="Two more characters required!" className="text-danger"/>,
          <Rule message="Must have at least 1 digit" className="text-success"/>,
        ])).to.equal(true)
      })
    })
  })
})
