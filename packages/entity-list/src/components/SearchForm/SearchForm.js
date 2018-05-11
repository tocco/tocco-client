import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm} from 'redux-form'

import {Button} from 'tocco-ui'
import {form, formField} from 'tocco-util'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.formBuilder = this.createFormBuilder(props)
  }

  componentWillMount() {
    this.props.initializeSearchForm()
  }

  componentWillReceiveProps(props) {
    this.formBuilder = this.createFormBuilder(props)
  }

  createFormBuilder = props => {
    const formFieldUtils = {
      relationEntities: props.relationEntities,
      loadRelationEntity: props.loadRelationEntity,
      loadRemoteEntity: props.loadRemoteEntity,
      remoteEntities: props.remoteEntities,
      loadSearchFilters: props.loadSearchFilters,
      searchFilters: props.searchFilters,
      intl: this.props.intl
    }

    return form.initFormBuilder(
      props.entity,
      props.entityModel,
      props.form,
      props.searchFormDefinition,
      props.formValues,
      formFieldUtils,
      {
        ...formField.defaultMapping,
        'fulltext-search': formField.editableValueFactory('string')
      },
      formField.defaultMapping,
      this.shouldRenderField,
      'search'
    )
  }

  handleResetClick = () => {
    this.props.resetSearch()
  }

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.submitSearchForm()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  isHidden = name => {
    if (!this.props.preselectedSearchFields) {
      return false
    }
    const field = this.props.preselectedSearchFields.find(f => f.id === name)
    return field && field.hidden
  }

  shouldRenderField = name => (
    !this.isHidden(name)
    && (
      this.props.disableSimpleSearch
      || this.props.showExtendedSearchForm
      || this.props.simpleSearchFields.includes(name)
    )
  )

  toggleExtendedSearchForm = () => {
    this.props.setShowExtendedSearchForm(!this.props.showExtendedSearchForm)
  }

  render() {
    const props = this.props

    if (!props.searchFormDefinition.children || Object.keys(props.entityModel).length === 0) {
      return null
    }

    // SCR_TEMP remove style attributes
    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        {this.formBuilder()}
        <div className="row" style={{marginBottom: '1em'}}>
          <div className="col-sm-9 col-sm-push-3">
            <Button
              ink="primary"
              label={this.msg('client.entity-list.search')}
              look="raised"
              type="submit"
            />
            <span style={{display: 'inline-block', width: '.5em'}}/>
            <Button
              label={this.msg('client.entity-list.reset')}
              look="raised"
              onClick={this.handleResetClick}
            />
            {!props.disableSimpleSearch
            && <span style={{float: 'right'}} title={this.msg('client.entity-list.extendedSearch')}>
              <Button
                icon={`glyphicon-chevron-${this.props.showExtendedSearchForm ? 'up' : 'down'}`}
                iconPosition="solely"
                onClick={this.toggleExtendedSearchForm}
              />
            </span>
            }
          </div>
        </div>
      </form>
    )
  }
}

SearchForm.propTypes = {
  intl: intlShape.isRequired,
  initializeSearchForm: PropTypes.func.isRequired,
  entityModel: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      targetEntity: PropTypes.string
    })
  ).isRequired,
  searchFormDefinition: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  submitSearchForm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  relationEntities: PropTypes.shape({
    entityName: PropTypes.shape({
      loaded: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string
        })
      )
    })
  }).isRequired,
  loadRelationEntity: PropTypes.func.isRequired,
  loadSearchFilters: PropTypes.func.isRequired,
  searchFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      display: PropTypes.string
    })
  ),
  disableSimpleSearch: PropTypes.bool,
  simpleSearchFields: PropTypes.arrayOf(
    PropTypes.string
  ),
  showExtendedSearchForm: PropTypes.bool,
  setShowExtendedSearchForm: PropTypes.func.isRequired,
  preselectedSearchFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      hidden: PropTypes.bool
    })
  )
}

export default reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(SearchForm)
