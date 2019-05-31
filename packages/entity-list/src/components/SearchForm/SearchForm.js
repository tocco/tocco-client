import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {reduxForm} from 'redux-form'
import {Button} from 'tocco-ui'
import {form, formField} from 'tocco-app-extensions'

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
      <form onSubmit={this.handleSubmit} className="form-horizontal">
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
            && <span
              style={{float: 'right'}}
              title={this.msg('client.entity-list.extendedSearch')}
              data-cy="extend-search-button"
            >
              <Button
                icon={`chevron-${this.props.showExtendedSearchForm ? 'up' : 'down'}`}
                iconPosition="sole"
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
  form: REDUX_FORM_NAME,
  destroyOnUnmount: false
})(SearchForm)
