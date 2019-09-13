import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm} from 'redux-form'
import {Button} from 'tocco-ui'
import {form, formField} from 'tocco-app-extensions'

import {
  StyledSearchForm,
  StyledSearchFormButtonGroup,
  StyledSearchFormButtonGroupGap
} from './StyledSearchForm'

const REDUX_FORM_NAME = 'searchForm'

class SearchForm extends React.Component {
  handleResetClick = () => {
    this.props.resetSearch()
  }

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.submitSearchForm()
  }

  msg = id => (this.props.intl.formatMessage({id}))

  isHidden = (preselectedSearchFields, name) => {
    if (!preselectedSearchFields) {
      return false
    }
    const field = preselectedSearchFields.find(f => f.id === name)
    return field && field.hidden
  }

  shouldRenderField = (preselectedSearchFields,
    disableSimpleSearch,
    showExtendedSearchForm,
    simpleSearchFields) => name => (
    !this.isHidden(preselectedSearchFields, name)
    && (
      disableSimpleSearch
      || showExtendedSearchForm
      || simpleSearchFields.includes(name)
    )
  )

  toggleExtendedSearchForm = () => {
    this.props.setShowExtendedSearchForm(!this.props.showExtendedSearchForm)
  }

  customMapping = {'fulltext-search': formField.editableValueFactory('string')}

  render() {
    const props = this.props

    if (!props.searchFormDefinition.children || Object.keys(props.entityModel).length === 0) {
      return null
    }
    return (
      <StyledSearchForm>
        <form onSubmit={this.handleSubmit}>
          <form.FormBuilder
            entity={props.entity}
            model={props.entityModel}
            formName={props.form}
            formDefinition={props.searchFormDefinition}
            formValues={props.formValues}
            formFieldMapping={{
              ...formField.defaultMapping,
              ...this.customMapping
            }}
            readOnlyFormFieldMapping={formField.defaultMapping}
            beforeRenderField={this.shouldRenderField(
              this.props.preselectedSearchFields,
              this.props.disableSimpleSearch,
              this.props.showExtendedSearchForm,
              this.props.simpleSearchFields)
            }
            mode="search"
          />
          <StyledSearchFormButtonGroup look="raised">
            <Button
              ink="primary"
              label={this.msg('client.entity-list.search')}
              look="raised"
              type="submit"
            />
            <Button
              data-cy="search-form_reset-button"
              label={this.msg('client.entity-list.reset')}
              look="raised"
              onClick={this.handleResetClick}
            />
            {!props.disableSimpleSearch
            && <React.Fragment>
              <StyledSearchFormButtonGroupGap/>
              <Button
                data-cy="extend-search-button"
                icon={`chevron-${this.props.showExtendedSearchForm ? 'up' : 'down'}`}
                iconPosition="sole"
                onClick={this.toggleExtendedSearchForm}
                title={this.msg('client.entity-list.extendedSearch')}
              />
            </React.Fragment>
            }
          </StyledSearchFormButtonGroup>
        </form>
      </StyledSearchForm>
    )
  }
}

SearchForm.propTypes = {
  intl: intlShape.isRequired,
  entityModel: PropTypes.shape({
    paths: PropTypes.object,
    name: PropTypes.string
  }).isRequired,
  searchFormDefinition: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  submitSearchForm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
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
  ),
  entity: PropTypes.object,
  form: PropTypes.string,
  formValues: PropTypes.object
}

export default reduxForm({
  form: REDUX_FORM_NAME,
  destroyOnUnmount: false
})(SearchForm)
