import {CKEditor} from '@ckeditor/ckeditor5-react'
import {mount} from 'enzyme'

import HtmlEdit from './HtmlEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('HtmlEdit ', () => {
        test('should render editor', () => {
          const wrapper = mount(<HtmlEdit value="<p>foo</p>" />)
          expect(wrapper.find(CKEditor)).to.be.not.null
        })
      })
    })
  })
})
