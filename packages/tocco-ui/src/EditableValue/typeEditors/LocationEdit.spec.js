import React from 'react'
import {mount} from 'enzyme'

import LocationEdit,
{
  getMapsAddress,
  returnGetSuggestions,
  returnGetSuggestion
}
  from './LocationEdit'

const options = {
  suggestions: [],
  fetchSuggestions: () => {},
  isLoading: false
}

const EMPTY_FUNC = () => {}

const suggestions = [
  {
    city: `Zurich`,
    zip: '2306',
    canton: 'ZH',
    address: 'Bahnhofstrasse 1',
    district: 'Zurich',
    country: 'CH'
  },
  {
    city: 'Lausanne',
    zip: '2300',
    canton: 'VD',
    address: 'Rue Saint Roche 1',
    district: 'VD',
    country: 'CH'
  },
  {
    city: 'Bern',
    zip: '3450',
    canton: 'BE',
    address: 'Bundesplatz',
    district: 'Bern',
    country: 'CH'
  }
]

const locationString = 'https://www.google.com/maps/search/?api=1&query=Zurich+2306+ZH+Bahnhofstrasse 1+Zurich+CH+'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('LocationEdit ', () => {
        test('should render LocationEdit', () => {
          const wrapper = mount(<LocationEdit options={options}/>)
          expect(wrapper.find('input')).to.have.length(2)
        })

        test('should render input value', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={EMPTY_FUNC}
            value={suggestions[0]}/>)

          expect(wrapper.props().value.zip).to.eql(suggestions[0].zip)
        })

        test('should render ButtonLink', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={EMPTY_FUNC}
            value={suggestions[0]}/>)

          expect(wrapper.find('ButtonLink')).to.have.length(1)
        })

        test('should set ButtonLink href', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={EMPTY_FUNC}
            value={suggestions[0]}/>)

          expect(wrapper.find('ButtonLink').props().href).to.eql(locationString)
        })

        describe('getMapsAddress', () => {
          test('should get maps address', () => {
            expect(getMapsAddress(suggestions[0])).to.eql(locationString)
          })

          test('should get default maps address', () => {
            const result = `https://www.google.com/maps/search/?api=1&query=`
            expect(getMapsAddress()).to.equal(result)
          })
        })

        describe('returnGetSuggestions', () => {
          test('should return empty array', () => {
            const attr = 'zip'
            const value = '23'
            const result = []
            expect(returnGetSuggestions(attr)(value)).to.eql(result)
            expect(returnGetSuggestions(attr)('', suggestions)).to.eql(result)
          })

          test('should return suggestions', () => {
            const attr = 'zip'
            const value = '23'
            const result = [suggestions[0], suggestions[1]]
            expect(returnGetSuggestions(attr)(value, suggestions)).to.eql(result)
          })
        })

        describe('returnGetSuggestion', () => {
          test('should return suggestion value', () => {
            const result = suggestions[0].zip
            expect(returnGetSuggestion('zip')(suggestions[0])).to.eql(result)
          })
        })
      })
    })
  })
})
