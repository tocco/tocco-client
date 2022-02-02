import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _merge from 'lodash/merge'
import _pick from 'lodash/pick'
import _reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {getFormAsyncErrors, getFormSubmitErrors, getFormSyncErrors, isDirty as isDirtySelector} from 'redux-form'

import {openAdvancedSearch} from './advancedSearch/actions'
import {loadLocationsSuggestions} from './locations/actions'
import {loadRelationEntities} from './relationEntities/actions'
import {openRemoteCreate} from './remoteCreate/actions'
import {loadSearchFilters} from './searchFilters/actions'
import {loadTooltip} from './tooltips/actions'
import {setDocument, uploadDocument} from './upload/actions'
import {changeFieldValue, touchField} from './values/actions'

const FormData = props => <React.Fragment>{React.cloneElement(props.children, {formData: props})}</React.Fragment>

FormData.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = (
  state,
  {formValues, tooltips, locations, relationEntities, searchFilters, isDirty, errors, navigationStrategy}
) => ({
  ...(relationEntities ? {relationEntities: _pick(state.formData.relationEntities.data, relationEntities)} : {}),
  ...(tooltips ? {tooltips: _pick(state.formData.tooltips?.data, tooltips)} : {}),
  ...(searchFilters ? {searchFilters: _pick(state.formData.searchFilters, searchFilters)} : {}),
  ...(locations ? {locations: _pick(state.formData.locations, locations)} : {}),
  ...(formValues && state.form[formValues.formName]
    ? {formValues: _pick(state.form[formValues.formName].values, formValues.fields)}
    : {}),
  ...(isDirty && state.form[isDirty.formName]
    ? {isDirty: isDirtySelector(isDirty.formName)(state, ...isDirty.fields)}
    : {}),
  ...(errors && state.form[errors.formName]
    ? {
        errors: _reduce(
          _merge(
            _pick(getFormSubmitErrors(errors.formName)(state), errors.fields),
            _pick(getFormSyncErrors(errors.formName)(state), errors.fields),
            _pick(getFormAsyncErrors(errors.formName)(state), errors.fields)
          ),
          (result, value) => ({...result, ...value}),
          null
        )
      }
    : null),
  ...(navigationStrategy && state.formData.navigationStrategy
    ? {navigationStrategy: state.formData.navigationStrategy.navigationStrategy}
    : {}),
  ...(state.formData.upload?.chooseDocument ? {chooseDocument: state.formData.upload.chooseDocument} : {}),
  entityModel: _get(state, 'entityDetail.entityModel')
})

const mapActionCreators = {
  loadRelationEntities: loadRelationEntities,
  loadTooltip: loadTooltip,
  openAdvancedSearch: openAdvancedSearch,
  uploadDocument: uploadDocument,
  setDocument: setDocument,
  changeFieldValue: changeFieldValue,
  touchField: touchField,
  loadSearchFilters: loadSearchFilters,
  loadLocationsSuggestions: loadLocationsSuggestions,
  openRemoteCreate: openRemoteCreate
}

const FormDataContainer = connect(mapStateToProps, mapActionCreators, null, {
  areStatePropsEqual: _isEqual
})(injectIntl(FormData))

export default FormDataContainer
