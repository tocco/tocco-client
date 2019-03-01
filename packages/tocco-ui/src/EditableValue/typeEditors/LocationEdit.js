import PropTypes from 'prop-types'
import React from 'react'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledStringEdit from './StyledStringEdit'

const LocationEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange({
        city_c: 'Zurich',
        zip_c: '8047',
        relCountry_c: {'display': 'Switzerland', 'key': '1'},
        canton_c: 'ZH',
        district_c: 'Zurich'
      })
    }
  }

  return (
    <StyledEditableWrapper readOnly={props.readOnly}>
      <StyledStringEdit
        name={props.name}
        onChange={handleChange}
        value={`${props.value.zipcode} ${props.value.city}`}
        id={props.id}
        disabled={props.readOnly}
      />
      <button onClick={() => props.options.fetchSuggestions(props.value.city)}>ZH</button>
      {JSON.stringify(props.options.suggestions)}
      {JSON.stringify(props.options.isLoading)}
    </StyledEditableWrapper>
  )
}

const locationObjectPropType = PropTypes.shape({
  city: PropTypes.string,
  zipcode: PropTypes.string,
  address: PropTypes.string,
  country: PropTypes.shape({key: PropTypes.string, display: PropTypes.string}),
  canton: PropTypes.string,
  district: PropTypes.string
}
)

LocationEdit.propTypes = {
  onChange: PropTypes.func,
  value: locationObjectPropType,
  options: PropTypes.shape({
    suggestions: PropTypes.arrayOf(locationObjectPropType),
    fetchSuggestions: PropTypes.func,
    noSuggestionsText: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default LocationEdit
