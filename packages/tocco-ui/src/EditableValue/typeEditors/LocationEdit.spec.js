import React from 'react'
import {mount} from 'enzyme'

import LocationEdit from './LocationEdit'

const options = {
  suggestions: [],
  fetchSuggestions: () => {},
  noSuggestionsText: '',
  isLoading: false
}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('LocationEdit ', () => {
        test('should render LocationEdit', () => {
          const wrapper = mount(<LocationEdit options={options}/>)
          expect(wrapper.find('input')).to.have.length(2)
        })
      })
    })
  })
})
