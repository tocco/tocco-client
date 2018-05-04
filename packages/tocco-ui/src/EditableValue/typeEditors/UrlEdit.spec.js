import React from 'react'
import {mount} from 'enzyme'

import UrlEdit from './UrlEdit'

describe('tocco-ui', function() {
  describe('EditableValue', function() {
    describe('typeEditors', function() {
      describe('UrlEdit ', function() {
        it('should show the value and a link', function() {
          const value = 'http://www.tocco.ch'
          const wrapper = mount(<UrlEdit value={value}/>)
          expect(wrapper.html()).to.have.string(value)
          expect(wrapper.find('a')).to.have.length(1)
        })

        it('should now show a link with no value', function() {
          const value = ''
          const wrapper = mount(<UrlEdit value={value}/>)
          expect(wrapper.find('a')).to.have.length(0)
        })

        it('should normalize new input', function() {
          const input = 'www.google.COM'
          const expectedResult = 'https://www.google.com'
          const onChangeSpy = sinon.spy()
          const wrapper = mount(<UrlEdit value="" onChange={onChangeSpy}/>)
          wrapper.find('input').simulate('change', {target: {value: input}})

          expect(onChangeSpy).to.have.been.calledWith(expectedResult)
        })
      })
    })
  })
})
