import React from 'react'
import {shallow} from 'enzyme'

import SingleSelect from './SingleSelect'
import MultiSelect from './MultiSelect'
import SearchFilterEdit from './SearchFilterEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('SearchFilterEdit ', () => {
        it('should render a Single-Select component', () => {
          const options = {
            multi: false
          }

          const wrapper = shallow(<SearchFilterEdit options={options} value="1" onChange={() => {}}/>)
          expect(wrapper.find(SingleSelect)).to.have.length(1)
        })

        it('should render a Multi-Select Component', () => {
          const options = {
            multi: true
          }

          const wrapper = shallow(<SearchFilterEdit options={options} value="1" onChange={() => {}}/>)
          expect(wrapper.find(MultiSelect)).to.have.length(1)
        })
      })
    })
  })
})
