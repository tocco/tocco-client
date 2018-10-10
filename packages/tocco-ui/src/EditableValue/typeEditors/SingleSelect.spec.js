import React from 'react'
import {shallow} from 'enzyme'

import Select from '../../Select'
import SingleSelect from './SingleSelect'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('SingleSelect ', () => {
        test('should render a Select component', () => {
          const options = {
            options: [
              {key: 1, display: 'label1'},
              {key: 2, display: 'label2'}
            ]
          }

          const wrapper = shallow(<SingleSelect options={options} value={{key: '1'}} onChange={() => {}}/>)
          expect(wrapper.find(Select)).to.have.length(1)
          const select = wrapper.find(Select)
          expect(select.props().options).to.eql(options.options)
        })
      })
    })
  })
})
