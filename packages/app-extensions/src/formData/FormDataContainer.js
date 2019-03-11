import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

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

const mapStateToProps = state => ({
  relationEntities: state.formData.relationEntities.data,
  tooltips: state.formData.tooltips.data,
  searchFilters: state.formData.searchFilters,
  locations: state.formData.locations
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
  mapActionCreators
)(injectIntl(FormData))

export default FormDataContainer
