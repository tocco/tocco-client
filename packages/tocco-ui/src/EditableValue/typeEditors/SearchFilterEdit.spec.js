import React from 'react'
import {shallow} from 'enzyme'

import Select from '../../Select'
import SearchFilterEdit from './SearchFilterEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('SearchFilterEdit ', () => {
        test('should render a Single-Select component', () => {
          const options = {
            isMulti: false
          }

          const wrapper = shallow(<SearchFilterEdit options={options} value={{key: '1'}} onChange={() => {}}/>)
          expect(wrapper.find(Select)).to.have.length(1)
        })

        test('should render a Multi-Select Component', () => {
          const options = {
            isMulti: true
          }

          const wrapper = shallow(<SearchFilterEdit options={options} value={[{key: '1'}]} onChange={() => {}}/>)
          expect(wrapper.find(Select)).to.have.length(1)
        })
      })
    })
  })
})
