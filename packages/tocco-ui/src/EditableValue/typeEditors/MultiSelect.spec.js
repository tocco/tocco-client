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
            store: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }

          const wrapper = shallow(<MultiSelect options={options} value={[1]} onChange={() => {}}/>)
          expect(wrapper.find(Select)).to.have.length(1)
          const select = wrapper.find(Select)
          expect(select.props().options).to.eql(options.store)
        })

        it('should call onChange', () => {
          const newValues = [{key: 1, display: 'label1'}]
          const spy = sinon.spy()
          const options = {
            store: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }
          const wrapper = shallow(<MultiSelect onChange={spy} options={options}/>)
          wrapper.find(Select).simulate('change', newValues)
          expect(spy).to.have.been.calledWith(newValues)
        })
      })
    })
  })
})
