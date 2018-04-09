import React from 'react'
import {mount} from 'enzyme'
import ReactQuill from 'react-quill'

import HtmlEdit from './HtmlEdit'

describe('tocco-ui', function() {
  describe('EditableValue', function() {
    describe('typeEditors', function() {
      describe('HtmlEdit ', function() {
        it('should render editor', function() {
          const wrapper = mount(<HtmlEdit value="<p>foo</p>"/>)
          expect(wrapper.find(ReactQuill)).to.be.not.null
        })
      })
    })
  })
})
