import React from 'react'
import ReactSelect from 'react-select'
import {shallow, mount} from 'enzyme'

import Select from './Select'

describe('tocco-ui', () => {
  describe('Select', () => {
    describe('<Select>', () => {
      test('should render a react-select', () => {
        const wrapper = mount(<Select/>)
        expect(wrapper.find(ReactSelect)).to.have.length(1)
      })

      test('should call on change event', () => {
        const onChangeSpy = sinon.spy()
        const wrapper = shallow(<Select onChange={onChangeSpy}/>)

        const selectWrapper = wrapper.find(ReactSelect)
        selectWrapper.simulate('change')
        expect(onChangeSpy).to.have.been.called
      })

      test('should set the more option available option', () => {
        const moreOptionsAvailableText = '...'
        const wrapper = shallow(<Select moreOptionsAvailable moreOptionsAvailableText={moreOptionsAvailableText}/>)
        const selectWrapper = wrapper.find(ReactSelect)
        expect(selectWrapper.props().options).to.deep.equal([{display: moreOptionsAvailableText, isDisabled: true}])
      })
    })
  })
})
