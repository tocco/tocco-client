import React from 'react'
import {mount} from 'enzyme'

import LocationEdit,
{getMapsAddress}
  from './LocationEdit'

const options = {
  suggestions: [],
  fetchSuggestions: sinon.spy(),
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
    country: {display: 'CH', key: 'CH'}
  },
  {
    city: 'Lausanne',
    zip: '2300',
    canton: 'VD',
    address: 'Rue Saint Roche 1',
    district: 'VD',
    country: {display: 'CH', key: 'CH'}
  },
  {
    city: 'Bern',
    zip: '3450',
    canton: 'BE',
    address: 'Bundesplatz',
    district: 'Bern',
    country: {display: 'CH', key: 'CH'}
  }
]

const locationString = 'https://www.google.com/maps/search/?api=1&query=Zurich+2306+ZH+Bahnhofstrasse 1+Zurich+CH'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('LocationEdit ', () => {
        test('should render LocationEdit', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={EMPTY_FUNC}
            value={suggestions[0]}/>)
          expect(wrapper.find('input')).to.have.length(2)
        })

        test('should render input value', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={EMPTY_FUNC}
            value={suggestions[0]}/>)

          expect(wrapper.props().value.zip).to.eql(suggestions[0].zip)
        })

        test('should update value zip', () => {
          const spy = sinon.spy()
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={spy}
            value={{}}
          />)

          wrapper.find('input.react-autosuggest__input').at(0).simulate('change', {target: {value: '23'}})
          expect(wrapper.props().onChange).to.have.been.calledWith({zip: '23'})
        })

        test('should call fetchSuggestions with new value', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={EMPTY_FUNC}
            value={suggestions[0]}/>)

          wrapper.find('input').at(0).simulate('change', {target: {value: '23'}})
          expect(wrapper.props().options.fetchSuggestions).to.have.been.calledWith('23')
        })

        test('should call onChange with new value', () => {
          const wrapper = mount(<LocationEdit
            options={options}
            onChange={sinon.spy()}
            value={suggestions[0]}/>)

          wrapper.find('input').at(0).simulate('change', {target: {value: '2345'}})
          expect(wrapper.props().onChange).to.have.been.calledWith({zip: '2345'})
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
      })
    })
  })
})
