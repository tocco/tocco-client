import React from 'react'
import {shallow, mount} from 'enzyme'
import TetheredSelectWrap from './TetherSelectWrap'

import SingleSelect from './SingleSelect'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('SingleSelect ', () => {
        it('should render a Select component', () => {
          const options = {
            store: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }

          const wrapper = shallow(<SingleSelect options={options} value={{key: '1'}} onChange={() => {}}/>)
          expect(wrapper.find(TetheredSelectWrap)).to.have.length(1)
          const select = wrapper.find(TetheredSelectWrap)
          expect(select.props().options).to.eql(options.store)
        })

        it('should call onChange ', () => {
          const newValue = {key: 1, display: 'label1'}
          const spy = sinon.spy()
          const options = {
            store: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }
          const wrapper = shallow(<SingleSelect onChange={spy} options={options}/>)
          wrapper.find(TetheredSelectWrap).simulate('change', newValue)
          expect(spy).to.have.been.calledWith(newValue)
        })

        it('should use value as options if no store provided', () => {
          const value = {key: 1, display: 'label1'}
          const options = {}

          const wrapper = mount(<SingleSelect value={value} options={options} onChange={EMPTY_FUNC}/>)
          expect(wrapper.find(TetheredSelectWrap).first().props().options).to.eql([value])
          wrapper.setProps({options: {store: []}})
          expect(wrapper.find(TetheredSelectWrap).first().props().options).to.eql([value])

          const store = [value, {key2: 'Label2'}]
          wrapper.setProps({options: {store}})
          expect(wrapper.find(TetheredSelectWrap).first().props().options).to.eql(store)
        })
      })
    })
  })
})
