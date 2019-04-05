import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import _isEqual from 'lodash/isEqual'

import {loadRelationEntities} from './relationEntities/actions'
import {loadTooltip} from './tooltips/actions'
import {openAdvancedSearch} from './advancedSearch/actions'
import {changeFieldValue} from './values/actions'
import {uploadDocument} from './upload/actions'
import {loadSearchFilters} from './searchFilters/actions'
import {loadLocationsSuggestions} from './locations/actions'

const FormData = props =>
  <React.Fragment>{React.cloneElement(props.children, {utils: props})}</React.Fragment>

FormData.propTypes = {
  children: PropTypes.node
}

export const mapStateToProps = (state, props) => {
  let formValues = {}

  if (state.form) {
    if (state.form[props.children.props.formName]) {
      formValues = state.form[props.children.props.formName].values
    }
  }

  const locationMapping = props.children.props.formField.locationMapping || {}
  const locationMappingValues = Object.values(locationMapping)

  const filteredLocationData = Object.keys(formValues)
    .filter(key => locationMappingValues.includes(key))
    .reduce((obj, key) => {
      obj[key] = formValues[key]
      return obj
    }, {})

  return {
    relationEntities: state.formData.relationEntities.data,
    tooltips: state.formData.tooltips.data,
    searchFilters: state.formData.searchFilters,
    locations: state.formData.locations,
    formValues: filteredLocationData
  }
}

const mapActionCreators = {
  loadRelationEntities: loadRelationEntities,
  loadTooltip: loadTooltip,
  openAdvancedSearch: openAdvancedSearch,
  uploadDocument: uploadDocument,
  changeFieldValue: changeFieldValue,
  loadSearchFilters: loadSearchFilters,
  loadLocationsSuggestions: loadLocationsSuggestions
}

const FormDataContainer = connect(
  mapStateToProps,
  mapActionCreators,
  null,
  {
    areStatesEqual: (prev, next) => {
      return _isEqual(prev.formData, next.formData)
    },
    areStatePropsEqual: (prev, next) => {
      return _isEqual(next.formValues, {})
    }
  }
)(injectIntl(FormData))

export default FormDataContainer
