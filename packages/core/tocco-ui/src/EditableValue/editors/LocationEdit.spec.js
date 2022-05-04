import {mount} from 'enzyme'

import LocationEdit, {getGoogleMapsAddress} from './LocationEdit'

const options = {
  suggestions: [],
  fetchSuggestions: sinon.spy(),
  isLoading: false,
  country: ['CH', 'AT'],
  locationValues: {
    city: 'Zurich',
    postcode: '2306',
    canton: 'ZH',
    address: 'Bahnhofstrasse 1',
    district: 'Zurich',
    country: {display: 'CH', key: '1'}
  }
}

const EMPTY_FUNC = () => {}

const value = {
  city: 'Zurich',
  postcode: '2306'
}

const locationString = 'https://www.google.com/maps/search/?api=1&query=Zurich+2306+ZH+Bahnhofstrasse 1+Zurich+CH'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('LocationEdit ', () => {
        test('should render LocationEdit', () => {
          const wrapper = mount(<LocationEdit options={options} onChange={EMPTY_FUNC} value={value} />)
          expect(wrapper.find('input')).to.have.length(2)
        })

        test('should render input value', () => {
          const wrapper = mount(<LocationEdit options={options} onChange={EMPTY_FUNC} value={value} />)

          expect(wrapper.props().value.postcode).to.eql(value.postcode)
        })

        test('should update value postcode', () => {
          const spy = sinon.spy()
          const wrapper = mount(<LocationEdit options={options} onChange={spy} value={{}} />)

          wrapper
            .find('input.react-autosuggest__input')
            .at(0)
            .simulate('change', {target: {value: '23'}})
          expect(wrapper.props().onChange).to.have.been.calledWith({postcode: '23'})
        })

        test('should call fetchSuggestions with new value', () => {
          const wrapper = mount(<LocationEdit options={options} onChange={EMPTY_FUNC} value={value} />)

          wrapper
            .find('input')
            .at(0)
            .simulate('change', {target: {value: '23'}})
          expect(wrapper.props().options.fetchSuggestions).to.have.been.calledWith(
            {postcode: '23'},
            {display: 'CH', key: '1'}
          )
        })

        test('should call onChange with new value', () => {
          const wrapper = mount(<LocationEdit options={options} onChange={sinon.spy()} value={value} />)

          wrapper
            .find('input')
            .at(0)
            .simulate('change', {target: {value: '2345'}})
          expect(wrapper.props().onChange).to.have.been.calledWith({postcode: '2345', city: 'Zurich'})
        })

        test('should render Link', () => {
          const wrapper = mount(<LocationEdit options={options} onChange={EMPTY_FUNC} value={value} />)

          expect(wrapper.find('Link')).to.have.length(1)
        })

        test('should set Link href', () => {
          const wrapper = mount(<LocationEdit options={options} onChange={EMPTY_FUNC} value={value} />)

          expect(wrapper.find('Link').props().href).to.eql(locationString)
        })

        describe('getMapsAddress', () => {
          test('should get maps address', () => {
            expect(getGoogleMapsAddress(options.locationValues)).to.eql(locationString)
          })

          test('should get default maps address', () => {
            const result = 'https://www.google.com/maps/search/?api=1&query='
            expect(getGoogleMapsAddress()).to.equal(result)
          })
        })
      })
    })
  })
})
