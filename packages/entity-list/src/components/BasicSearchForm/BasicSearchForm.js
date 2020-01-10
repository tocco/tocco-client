import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm} from 'redux-form'
import {Button} from 'tocco-ui'
import {form, formField} from 'tocco-app-extensions'

import {
  StyledBasicSearchForm,
  StyledSearchFormButtonGroup,
  StyledSearchFormButtonGroupGap
} from './StyledBasicSearchForm'

const REDUX_FORM_NAME = 'searchForm'

class BasicSearchForm extends React.Component {
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
      <StyledBasicSearchForm>
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
            {!props.disableSimpleSearch
            && <React.Fragment>
              <StyledSearchFormButtonGroupGap/>
              <Button
                data-cy="extend-search-button"
                icon={`chevron-${this.props.showExtendedSearchForm ? 'up' : 'down'}`}
                onClick={this.toggleExtendedSearchForm}
                title={this.msg('client.entity-list.extendedSearch')}
              />
            </React.Fragment>
            }
          </StyledSearchFormButtonGroup>
        </form>
      </StyledBasicSearchForm>
    )
  }
}

BasicSearchForm.propTypes = {
  intl: intlShape.isRequired,
  entityModel: PropTypes.shape({
    paths: PropTypes.object,
    name: PropTypes.string
  }).isRequired,
  searchFormDefinition: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  submitSearchForm: PropTypes.func.isRequired,
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
})(BasicSearchForm)
