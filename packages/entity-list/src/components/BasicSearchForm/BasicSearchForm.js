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

const customMapping = {'fulltext-search': formField.editableValueFactory('string')}

const BasicSearchForm = ({
  disableSimpleSearch,
  entity,
  entityModel,
  form: formName,
  formValues,
  intl,
  preselectedSearchFields,
  searchFormDefinition,
  setShowExtendedSearchForm,
  showExtendedSearchForm,
  simpleSearchFields,
  submitSearchForm
}) => {
  if (!searchFormDefinition.children || Object.keys(entityModel).length === 0) {
    return null
  }

  const msg = id => intl.formatMessage({id})

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    submitSearchForm()
  }

  const isHidden = (preselectedSearchFields, name) => {
    if (!preselectedSearchFields) {
      return false
    }
    const field = preselectedSearchFields.find(f => f.id === name)
    return field && field.hidden
  }

  const shouldRenderField = (preselectedSearchFields,
    disableSimpleSearch,
    showExtendedSearchForm,
    simpleSearchFields) => name => (
    !isHidden(preselectedSearchFields, name)
    && (
      disableSimpleSearch
      || showExtendedSearchForm
      || simpleSearchFields.includes(name)
    )
  )

  const toggleExtendedSearchForm = () => {
    setShowExtendedSearchForm(!showExtendedSearchForm)
  }

  return (
    <StyledBasicSearchForm>
      <form onSubmit={handleSubmit}>
        <form.FormBuilder
          entity={entity}
          model={entityModel}
          formName={formName}
          formDefinition={searchFormDefinition}
          formValues={formValues}
          formFieldMapping={{
            ...formField.defaultMapping,
            ...customMapping
          }}
          readOnlyFormFieldMapping={formField.defaultMapping}
          beforeRenderField={shouldRenderField(
            preselectedSearchFields,
            disableSimpleSearch,
            showExtendedSearchForm,
            simpleSearchFields)
          }
          mode="search"
        />
        <StyledSearchFormButtonGroup look="raised">
          {!disableSimpleSearch
          && <React.Fragment>
            <StyledSearchFormButtonGroupGap/>
            <Button
              data-cy="extend-search-button"
              icon={`chevron-${showExtendedSearchForm ? 'up' : 'down'}`}
              onClick={toggleExtendedSearchForm}
              title={msg('client.entity-list.extendedSearch')}
            />
          </React.Fragment>
          }
        </StyledSearchFormButtonGroup>
      </form>
    </StyledBasicSearchForm>
  )
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
