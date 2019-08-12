import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import _isEqual from 'lodash/isEqual'
import _reduce from 'lodash/reduce'
import _pick from 'lodash/pick'
import _merge from 'lodash/merge'
import {
  isDirty as isDirtySelector,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors
} from 'redux-form'

import {loadRelationEntities} from './relationEntities/actions'
import {loadTooltip} from './tooltips/actions'
import {openAdvancedSearch} from './advancedSearch/actions'
import {changeFieldValue, touchField} from './values/actions'
import {uploadDocument} from './upload/actions'
import {loadSearchFilters} from './searchFilters/actions'
import {loadLocationsSuggestions} from './locations/actions'

const FormData = props =>
  <React.Fragment>{React.cloneElement(props.children, {formData: props})}</React.Fragment>

FormData.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = (
  state,
  {formValues, tooltips, locations, relationEntities, searchFilters, isDirty, errors}
) => {
  return {
    ...(relationEntities ? {relationEntities: _pick(state.formData.relationEntities.data, relationEntities)} : {}),
    ...(tooltips ? {tooltips: _pick(state.formData.tooltips.data, tooltips)} : {}),
    ...(searchFilters ? {searchFilters: _pick(state.formData.searchFilters, searchFilters)} : {}),
    ...(locations ? {locations: _pick(state.formData.locations, locations)} : {}),
    ...(formValues && state.form[formValues.formName]
      ? {formValues: _pick(state.form[formValues.formName].values, formValues.fields)} : {}),
    ...(isDirty && state.form[isDirty.formName]
      ? {isDirty: isDirtySelector(isDirty.formName)(state, ...isDirty.fields)} : {}),
    ...(errors && state.form[errors.formName]
      ? {
        errors: _reduce(
          _merge(
            _pick(getFormSubmitErrors(errors.formName)(state), errors.fields),
            _pick(getFormSyncErrors(errors.formName)(state), errors.fields),
            _pick(getFormAsyncErrors(errors.formName)(state), errors.fields)
          ),
          (result, value) => ({...result, ...value}), null)
      } : null),
    linkFactory: state.formData.linkFactory.linkFactory
  }
}

const mapActionCreators = {
  loadRelationEntities: loadRelationEntities,
  loadTooltip: loadTooltip,
  openAdvancedSearch: openAdvancedSearch,
  uploadDocument: uploadDocument,
  changeFieldValue: changeFieldValue,
  touchField: touchField,
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
