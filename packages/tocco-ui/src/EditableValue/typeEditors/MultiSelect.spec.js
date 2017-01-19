import React from 'react'
import {shallow} from 'enzyme'
import Select from 'react-select'

import MultiSelect from './MultiSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MultiSelect ', () => {
        it('should render a Select component', () => {
          const options = {
            possibleValues: [
              {value: 1, label: 'label1'},
              {value: 2, label: 'label2'}
            ]
          }

          const wrapper = shallow(<MultiSelect options={options} value="1" onChange={() => {}}/>)
          expect(wrapper.find(Select)).to.have.length(1)
          const select = wrapper.find(Select)
          expect(select.props().options).to.eql(options.possibleValues)
        })

        it('should call onChange', () => {
          const newValues = [{value: 1, label: 'label1'}]
          const spy = sinon.spy()
          const options = {
            possibleValues: [
              {value: 1, label: 'label1'},
              {value: 2, label: 'label2'}
            ]
          }
          const wrapper = shallow(<MultiSelect onChange={spy} options={options}/>)
          wrapper.find(Select).simulate('change', newValues)
          expect(spy).to.have.been.calledWith([1])
        })
      })
    })
  })
})
