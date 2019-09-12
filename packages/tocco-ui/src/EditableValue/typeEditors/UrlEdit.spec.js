import React from 'react'
import {mount} from 'enzyme'

import UrlEdit from './UrlEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('UrlEdit ', () => {
        test('should show the value and a link', () => {
          const value = 'http://www.tocco.ch'
          const wrapper = mount(<UrlEdit value={value}/>)
          expect(wrapper.html()).to.have.string(value)
          expect(wrapper.find('a')).to.have.length(1)
        })

        test('should now show a link with no value', () => {
          const value = ''
          const wrapper = mount(<UrlEdit value={value}/>)
          expect(wrapper.find('a')).to.have.length(0)
        })

        test('should normalize new input', async() => {
          const input = 'www.google.COM'
          const expectedResult = 'https://www.google.com'
          const onChangeSpy = sinon.spy()
          const wrapper = mount(<UrlEdit value="" onChange={onChangeSpy}/>)
          wrapper.find('input').simulate('change', {target: {value: input}})

          await new Promise(resolve => setTimeout(() => {
            expect(onChangeSpy).to.have.been.calledWith(expectedResult)
            resolve()
          }, 300))
        })
      })
    })
  })
})
