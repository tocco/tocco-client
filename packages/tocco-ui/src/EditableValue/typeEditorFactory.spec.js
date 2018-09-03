import {mount} from 'enzyme'

import typeEditorFactory from './typeEditorFactory'
import StringEdit from './typeEditors/StringEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeFormatterProvider', () => {
      it('should render a type and set props', () => {
        const wrapper = mount(
          typeEditorFactory('string', 'test', EMPTY_FUNC, {})
        )

        const typeWrapper = wrapper.children().first()
        expect(typeWrapper.is(StringEdit)).to.be.true
        expect(typeWrapper.props().value).to.eql('test')
      })

      it('should handle unknown types', () => {
        expect(typeEditorFactory('abc', 'test', EMPTY_FUNC, {})).to.be.null
      })

      it('should attach events', () => {
        const blurSpy = sinon.spy()
        const focusSpy = sinon.spy()

        const events = {
          onBlur: blurSpy,
          onFocus: focusSpy
        }
        const wrapper = mount(
          typeEditorFactory('string', 'test', EMPTY_FUNC, {}, 'id', events)
        )

        wrapper.find('input').first().simulate('focus')
        expect(focusSpy).to.have.calledOnce

        wrapper.find('input').first().simulate('blur')
        expect(blurSpy).to.have.calledOnce
      })
    })
  })
})
