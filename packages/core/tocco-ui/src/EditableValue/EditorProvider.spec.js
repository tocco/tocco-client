import {mount} from 'enzyme'

import EditorProvider from './EditorProvider'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeFormatterProvider', () => {
      test('should render a type and set props', () => {
        const wrapper = mount(<EditorProvider componentType="string" value="test" />)

        expect(wrapper.find('StringEdit')).to.have.length(1)
        expect(wrapper.find('StringEdit').props().value).to.eql('test')
      })

      test('should attach events', () => {
        const blurSpy = sinon.spy()
        const focusSpy = sinon.spy()

        const events = {
          onBlur: blurSpy,
          onFocus: focusSpy
        }
        const wrapper = mount(<EditorProvider componentType="string" value="test" events={events} />)

        wrapper.find('input').first().simulate('focus')
        expect(focusSpy).to.have.calledOnce

        wrapper.find('input').first().simulate('blur')
        expect(blurSpy).to.have.calledOnce
      })
    })
  })
})
