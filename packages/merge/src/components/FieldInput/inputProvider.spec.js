import inputProvider from './inputProvider'
import {shallow, mount} from 'enzyme'
import StringInput from './typeInputs/StringInput'

describe('merge', () => {
  describe('FieldInput Component', () => {
    describe('inputProvider', () => {
      it('should return string input and set props', () => {
        const disabled = true
        const onChange = () => {
        }

        const wrapper = mount(
          inputProvider({type: 'string', value: 'test'}, onChange, disabled)
        )

        expect(wrapper.is(StringInput)).to.be.true
        expect(wrapper.props().onChange).to.equal(onChange)
        expect(wrapper.props().value).to.equal('test')
        expect(wrapper.find('input')).to.be.disabled()
      })

      it('should return empty div in case of unknown type', () => {
        const wrapper = shallow(
          inputProvider({type: 'unknown'}, () => {
          }, false)
        )

        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
