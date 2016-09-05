import assert from 'assert'
import React from 'react'
import FieldLabel from './FieldLabel'
import {mount, render, shallow} from 'enzyme'

describe('merge-action', function () {
  describe('FieldLabel Component', function () {
    it('should render a string value', function () {
      var field = {type: 'string', value: 'Test123'}
      let wrapper = shallow(<FieldLabel field={field}/>)

      expect(wrapper.text()).to.contain('Test123');
    })

    it('should render a date value', function () {
      var field = {type: 'date', value: "1976-03-15T23:00:00.000Z"}
      let wrapper = shallow(<FieldLabel field={field}/>)
      expect(wrapper.find('DateFieldLabel')).to.have.length(1);
    })
  })
})
