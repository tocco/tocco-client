import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import _isEqual from 'lodash/isEqual'
import _pick from 'lodash/pick'

import {loadRelationEntities} from './relationEntities/actions'
import {loadTooltip} from './tooltips/actions'
import {openAdvancedSearch} from './advancedSearch/actions'
import {changeFieldValue} from './values/actions'
import {uploadDocument} from './upload/actions'
import {loadSearchFilters} from './searchFilters/actions'
import {loadLocationsSuggestions} from './locations/actions'

const FormData = props =>
  <React.Fragment>{React.cloneElement(props.children, {formData: props})}</React.Fragment>

FormData.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = (state, {formValues, tooltips, locations, relationEntities, searchFilters}) => ({
  ...(relationEntities ? {relationEntities: _pick(state.formData.relationEntities.data, relationEntities)} : {}),
  ...(tooltips ? {tooltips: _pick(state.formData.tooltips.data, tooltips)} : {}),
  ...(searchFilters ? {searchFilters: _pick(state.formData.searchFilters, searchFilters)} : {}),
  ...(locations ? {locations: _pick(state.formData.locations, locations)} : {}),
  ...(formValues && state.form[formValues.formName]
    ? {formValues: _pick(state.form[formValues.formName].values, formValues.fields)} : {})
})

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
    areStatePropsEqual: _isEqual
  }
)(injectIntl(FormData))

export default FormDataContainer
