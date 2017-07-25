import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm} from 'redux-form'

import {Button} from 'tocco-ui'
import {form} from 'tocco-util'

import formFieldMapping from '../../util/formFieldMapping'

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
      intl: this.props.intl
    }

    return form.initFormBuilder(
      props.entity,
      props.entityModel,
      props.form,
      props.searchFormDefinition,
      props.formValues,
      formFieldUtils,
      formFieldMapping,
      formFieldMapping,
      this.shouldRenderField
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

    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        {this.formBuilder()}
        <div className="row">
          <div className="col-sm-9 col-sm-push-3">
            <Button
              type="submit"
              label={this.msg('client.entity-list.search')}
              primary
            />
            <Button
              type="button"
              label={this.msg('client.entity-list.reset')}
              onClick={this.handleResetClick}
            />
            {!props.disableSimpleSearch
            && <Button
              className="pull-right btn-link"
              type="button"
              label={this.msg('client.entity-list.extendedSearch')}
              onClick={this.toggleExtendedSearchForm}
            />
            }
          </div>
        </div>
      </form>
    )
  }
}

SearchForm.propTypes = {
  intl: intlShape.isRequired,
  initializeSearchForm: React.PropTypes.func.isRequired,
  entityModel: React.PropTypes.objectOf(
    React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      targetEntity: React.PropTypes.string
    })
  ).isRequired,
  searchFormDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  submitSearchForm: React.PropTypes.func.isRequired,
  resetSearch: React.PropTypes.func.isRequired,
  relationEntities: React.PropTypes.shape({
    entityName: React.PropTypes.shape({
      loaded: React.PropTypes.bool,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string,
          label: React.PropTypes.string
        })
      )
    })
  }).isRequired,
  loadRelationEntity: React.PropTypes.func.isRequired,
  disableSimpleSearch: React.PropTypes.bool,
  simpleSearchFields: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  showExtendedSearchForm: React.PropTypes.bool,
  setShowExtendedSearchForm: React.PropTypes.func.isRequired,
  preselectedSearchFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      hidden: React.PropTypes.bool
    })
  ).isRequired
}

export default reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(SearchForm)
