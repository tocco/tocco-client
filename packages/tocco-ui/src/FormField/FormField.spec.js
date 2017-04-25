import React from 'react'
import {shallow} from 'enzyme'
import FormField from './FormField'
import ErrorList from './ErrorList'

describe('tocco-ui', () => {
  describe('FormField', () => {
    it('should render child components', () => {
      const wrapper = shallow(<FormField><span id="content"/></FormField>)
      expect(wrapper.find('#content')).to.have.length(1)
    })

    it('should render label', () => {
      const wrapper = shallow(<FormField label="TESTLABEL"/>)
      expect(wrapper.find('label')).to.have.length(1)
      expect(wrapper.find('label')).to.contain('TESTLABEL')
    })

    it('should render errors if touched', () => {
      const error = {
        error1: ['error1-1'],
        error2: ['error2-1', 'error2-2']
      }
      const wrapper = shallow(<FormField error={error}/>)
      expect(wrapper.find(ErrorList)).to.have.length(0)

      wrapper.setProps({ touched: true })

      expect(wrapper.find(ErrorList)).to.have.length(1)
    })
  })
})
