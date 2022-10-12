import PropTypes from 'prop-types'
import {useRef} from 'react'
import {reduxForm} from 'redux-form'
import {form} from 'tocco-app-extensions'
import {Ball} from 'tocco-ui'
import {react as customHooks} from 'tocco-util'

import searchFormTypes from '../../util/searchFormTypes'
import {StyledBasicSearchForm, StyledSearchFormButtons} from './StyledBasicSearchForm'

const REDUX_FORM_NAME = 'searchForm'

const BasicSearchForm = ({
  searchFormType,
  entity,
  form: formName,
  formValues,
  intl,
  preselectedSearchFields,
  searchFormDefinition,
  setShowExtendedSearchForm,
  showExtendedSearchForm,
  simpleSearchFields: inputSimpleSearchFields,
  submitSearchForm
}) => {
  const searchFormEl = useRef(null)

  customHooks.useAutofocus(searchFormEl, {selectFulltextFields: true}, [searchFormDefinition])

  if (!searchFormDefinition.children) {
    return null
  }

  const msg = id => intl.formatMessage({id})

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    submitSearchForm()
  }

  const isHidden = (searchFields, name) => {
    if (!searchFields) {
      return false
    }
    const field = searchFields.find(f => f.id === name)
    return field && field.hidden
  }

  const toggleExtendedSearchForm = () => {
    setShowExtendedSearchForm(!showExtendedSearchForm)
  }

  const fields = form.getFieldDefinitions(searchFormDefinition)
  const simpleSearchFields =
    inputSimpleSearchFields && inputSimpleSearchFields.length > 0
      ? inputSimpleSearchFields
      : fields.filter(field => field.simpleSearch === true).map(field => field.path || field.id)
  const hasExtendedOnlySearchFields = !fields.every(field => simpleSearchFields.includes(field.id))
  const extendable = hasExtendedOnlySearchFields && searchFormType === searchFormTypes.SIMPLE_ADVANCED

  const shouldRenderField = name =>
    !isHidden(preselectedSearchFields, name) && (showExtendedSearchForm || simpleSearchFields.includes(name))

  return (
    <StyledBasicSearchForm ref={searchFormEl}>
      <form onSubmit={handleSubmit}>
        {extendable && (
          <StyledSearchFormButtons>
            <Ball
              data-cy="extend-search-button"
              icon={`chevron-${showExtendedSearchForm ? 'up' : 'down'}`}
              onClick={toggleExtendedSearchForm}
              title={msg('client.entity-list.extendedSearch')}
            />
          </StyledSearchFormButtons>
        )}
        <form.FormBuilder
          entity={entity}
          formName={formName}
          formDefinition={searchFormDefinition}
          formValues={formValues}
          fieldMappingType="search"
          beforeRenderField={shouldRenderField}
          mode="search"
        />
      </form>
    </StyledBasicSearchForm>
  )
}

BasicSearchForm.propTypes = {
  intl: PropTypes.object.isRequired,
  searchFormDefinition: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  submitSearchForm: PropTypes.func.isRequired,
  searchFormType: PropTypes.string.isRequired,
  simpleSearchFields: PropTypes.arrayOf(PropTypes.string),
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
