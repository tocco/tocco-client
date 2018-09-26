import React from 'react'
import {mount} from 'enzyme'
import ReactQuill from 'react-quill'

import HtmlEdit from './HtmlEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('HtmlEdit ', () => {
        test('should render editor', () => {
          const wrapper = mount(<HtmlEdit value="<p>foo</p>"/>)
          expect(wrapper.find(ReactQuill)).to.be.not.null
        })
      })
    })
  })
})
