import React from 'react'
import {shallow} from 'enzyme'

import TetheredSelectWrap from './TetherSelectWrap'
import MultiSelect from './MultiSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('MultiSelect ', () => {
        test('should render a Select component', () => {
          const options = {
            store: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }

          const wrapper = shallow(<MultiSelect options={options} value={[1]} onChange={() => {}}/>)
          expect(wrapper.find(TetheredSelectWrap)).to.have.length(1)
          const select = wrapper.find(TetheredSelectWrap)
          expect(select.props().options).to.eql(options.store)
        })

        test('should call onChange', () => {
          const newValues = [{key: 1, display: 'label1'}]
          const spy = sinon.spy()
          const options = {
            store: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }
          const wrapper = shallow(<MultiSelect onChange={spy} options={options}/>)
          wrapper.find(TetheredSelectWrap).simulate('change', newValues)
          expect(spy).to.have.been.calledWith(newValues)
        })
      })
    })
  })
})
