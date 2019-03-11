import React from 'react'
import {mount} from 'enzyme'

import LocationEdit,
{
  formatOptionLabel,
  getMapsAddress
}
  from './LocationEdit'

const options = {
  suggestions: [],
  fetchSuggestions: () => {},
  noSuggestionsText: '',
  isLoading: false
}

const locationInput = {
  city: `Zurich`,
  zip: '8006',
  address: 'Teststrasse',
  canton: 'ZH',
  district: 'Zurich',
  country: 'CH'
}

const menuString = `${locationInput.zip} ${locationInput.city} - ${locationInput.district} / ${locationInput.country}`

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('LocationEdit ', () => {
        test('should render LocationEdit', () => {
          const wrapper = mount(<LocationEdit options={options}/>)
          expect(wrapper.find('input')).to.have.length(2)
        })

        describe('getMapsAddress', () => {
          test('should get maps address', () => {
            const result = `https://www.google.com/maps/search/?api=1&query=Zurich+8006+Teststrasse+ZH+Zurich+CH+`
            expect(getMapsAddress(locationInput)).to.equal(result)
          })

          test('should get default maps address', () => {
            const result = `https://www.google.com/maps/search/?api=1&query=`
            expect(getMapsAddress()).to.equal(result)
          })
        })

        describe('formatOptionLabel', () => {
          test('should return createValueString', () => {
            const input = {label: ''}
            const info = {context: 'menu'}
            const result = <span>Provide Value</span>
            expect(formatOptionLabel('zip', 'Provide Value')(input, info)).to.eql(result)
          })

          test('should return input label on value created', () => {
            const input = {label: 'street'}
            const info = {context: 'value'}
            const result = <span>street</span>
            expect(formatOptionLabel('city')(input, info)).to.eql(result)
          })

          test('should return input label on suggested value', () => {
            const input = {zip: '2345'}
            const info = {context: 'value'}
            const result = <span>{input.zip}</span>
            expect(formatOptionLabel('zip')(input, info)).to.eql(result)
          })

          test('should return menu string', () => {
            const info = {context: 'menu'}
            expect(formatOptionLabel('zip')(locationInput, info).props.children).to.equal(menuString)
          })

          test('should return input label on value created without context', () => {
            const input = {label: 'Test City'}
            const info = {}
            expect(formatOptionLabel('zip')(input, info).props.children).to.equal(input.label)
          })

          test('should return null on no input or context', () => {
            const input = {}
            const info = {}
            expect(formatOptionLabel('zip')(input, info)).to.equal(null)
          })
        })
      })
    })
  })
})
