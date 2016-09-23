import assert from 'assert'
import React from 'react'
import FieldLabel from './FieldLabel'
import {mount, render, shallow} from 'enzyme'

describe('action-merge', function () {
  describe('FieldLabel Component', function () {
    it('should render a string value', function () {
      var field = {type: 'string', value: 'Test123'}
      let wrapper = shallow(<FieldLabel field={field}/>)
      expect(wrapper.find('StringLabel')).to.have.length(1);
    })

    it('should render a date value', function () {
      var field = {type: 'date', value: "1976-03-15T23:00:00.000Z"}
      let wrapper = shallow(<FieldLabel field={field}/>)
      expect(wrapper.find('DateFieldLabel')).to.have.length(1);
    })
  })
})
