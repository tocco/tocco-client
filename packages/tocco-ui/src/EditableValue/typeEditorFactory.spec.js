import {mount} from 'enzyme'
import typeEditorFactory from './typeEditorFactory'
import StringEdit from './typeEditors/StringEdit'

describe('tocco-ui', () => {
  const emptyFunc = () => {}
  describe('EditableValue', () => {
    describe('typeFormatterProvider', () => {
      it('should render a type and set props', () => {
        const wrapper = mount(
          typeEditorFactory('string', 'test', emptyFunc, {})
        )

        expect(wrapper.is(StringEdit)).to.be.true
        expect(wrapper.props().value).to.eql('test')
      })

      it('should handle unknown types', () => {
        expect(typeEditorFactory('abc', 'test', emptyFunc, {})).to.be.null
      })
    })
  })
})
