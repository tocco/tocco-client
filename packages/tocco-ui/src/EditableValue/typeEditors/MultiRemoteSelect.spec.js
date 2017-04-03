import React from 'react'
import {shallow} from 'enzyme'
import Select from 'react-select'

import MultiRemoteSelect from './MultiRemoteSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MultiRemoteSelect ', () => {
        it('should render a Async Select component', () => {
          const wrapper = shallow(
            <MultiRemoteSelect
              options={{}}
              value={[{key: 2, display: 'Two'}]}
              onChange={() => {}}
            />)
          expect(wrapper.find(Select.Async)).to.have.length(1)
        })

        it('should call onChange ', () => {
          const newValue = {key: 1, display: 'label1'}
          const spy = sinon.spy()
          const wrapper = shallow(<MultiRemoteSelect onChange={spy} options={{}}/>)
          wrapper.find(Select.Async).simulate('change', newValue)
          expect(spy).to.have.been.calledWith(newValue)
        })
      })
    })
  })
})
