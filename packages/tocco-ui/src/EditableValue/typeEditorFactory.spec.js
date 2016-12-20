import {mount} from 'enzyme'
import typeEditorFactory from './typeEditorFactory'
import StringEdit from './typeEditors/StringEdit'
import MultiSelect from './typeEditors/MultiSelect'

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

      it('should render another type and set props', () => {
        const wrapper = mount(
          typeEditorFactory(
            'multi-select',
            [1, 2],
            emptyFunc,
            {possibleValues: [{value: 2, label: '2'}, {value: 3, label: '3'}, {value: 4, label: '4'}]},
          )
        )

        expect(wrapper.is(MultiSelect)).to.be.true
        expect(wrapper.props().value).to.eql([1, 2])
        expect(wrapper.props().onChange).to.eql(emptyFunc)
        expect(wrapper.props().options.possibleValues).is.a('array')
      })

      it('should handle unknown types', () => {
        expect(typeEditorFactory('abc', 'test', emptyFunc, {})).to.be.null
      })
    })
  })
})
