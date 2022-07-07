import {mount} from 'enzyme'
import React from 'react'

import EmailEdit from './EmailEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('EmailEdit ', () => {
        test('should show the value and an email address', () => {
          const value = 'support@tocco.ch'
          const wrapper = mount(<EmailEdit value={value} />)
          expect(wrapper.html()).to.have.string(value)
          expect(wrapper.find('a')).to.have.length(1)
        })

        test('should not show the email icon if field is empty', () => {
          const value = ''
          const wrapper = mount(<EmailEdit value={value} />)
          expect(wrapper.find('a')).to.have.length(0)
        })
      })
    })
  })
})
