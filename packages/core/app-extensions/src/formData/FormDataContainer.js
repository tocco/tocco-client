import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _pick from 'lodash/pick'
import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {openAdvancedSearch, openDocsTreeSearch} from './advancedSearch/actions'
import {formDataConfigSelector} from './formData'
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
  {formValues, tooltips, locations, relationEntities, searchFilters, navigationStrategy}
) => {
  const config = formDataConfigSelector(state)
  return {
    ...(relationEntities ? {relationEntities: _pick(state.formData.relationEntities.data, relationEntities)} : {}),
    ...(tooltips ? {tooltips: _pick(state.formData.tooltips?.data, tooltips)} : {}),
    ...(searchFilters ? {searchFilters: _pick(state.formData.searchFilters, searchFilters)} : {}),
    ...(locations ? {locations: _pick(state.formData.locations, locations)} : {}),
    ...(formValues && state.form[formValues.formName]
      ? {formValues: _pick(state.form[formValues.formName].values, formValues.fields)}
      : {}),
    ...(navigationStrategy && config.navigationStrategy ? {navigationStrategy: config.navigationStrategy} : {}),
    ...(config.chooseDocument ? {chooseDocument: config.chooseDocument} : {}),
    entityModel: _get(state, 'entityDetail.entityModel')
  }
}

const mapActionCreators = {
  loadRelationEntities,
  loadTooltip,
  openAdvancedSearch,
  openDocsTreeSearch,
  uploadDocument,
  setDocument,
  changeFieldValue,
  touchField,
  loadSearchFilters,
  loadLocationsSuggestions,
  openRemoteCreate
}

const FormDataContainer = connect(mapStateToProps, mapActionCreators, null, {
  areStatePropsEqual: _isEqual
})(injectIntl(FormData))

export default FormDataContainer
