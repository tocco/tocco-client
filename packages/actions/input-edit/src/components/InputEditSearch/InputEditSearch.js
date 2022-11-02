import _debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import {useState} from 'react'
import {form} from 'tocco-app-extensions'
import SimpleFormApp from 'tocco-simple-form/src/main'
import {Ball} from 'tocco-ui'
import {tqlBuilder, env} from 'tocco-util'

import {Box, StyledExtendSearchButtonWrapper} from './StyledComponents'

const InputEditSearch = ({form: searchFormDefinition, setSearchFields}) => {
  const embedType = env.getEmbedType()
  const isAdmin = ['admin', 'legacy-admin'].includes(embedType)

  const [showExtendedSearchForm, setShowExtendedSearchForm] = useState(isAdmin)

  const toggleExtendedSearchForm = () => {
    setShowExtendedSearchForm(!showExtendedSearchForm)
  }

  if (!searchFormDefinition.children) {
    return null
  }

  const fields = form.getFieldDefinitions(searchFormDefinition)
  const simpleSearchFields = fields.filter(field => field.simpleSearch === true).map(field => field.path || field.id)
  const extendable = !isAdmin && !fields.every(field => simpleSearchFields.includes(field.id))

  const shouldRenderField = name => showExtendedSearchForm || simpleSearchFields.includes(name)

  return (
    <Box>
      {extendable && (
        <StyledExtendSearchButtonWrapper>
          <Ball
            data-cy="extend-search-button"
            icon={`chevron-${showExtendedSearchForm ? 'up' : 'down'}`}
            onClick={toggleExtendedSearchForm}
            title={'asdf'}
          />
        </StyledExtendSearchButtonWrapper>
      )}
      <SimpleFormApp
        form={searchFormDefinition}
        onChange={_debounce(handleChange(searchFormDefinition, setSearchFields), 500)}
        noButtons
        validate={false}
        mappingType="search"
        mode="search"
        beforeRenderField={shouldRenderField}
      />
    </Box>
  )
}

const handleChange =
  (searchFormDefinition, setSearchFields) =>
  ({values}) => {
    if (Object.keys(values).length > 0) {
      const tql = transformFormValuesToTql(values, searchFormDefinition)
      setSearchFields(tql)
    } else {
      setSearchFields([])
    }
  }

const transformFormValuesToTql = (values, searchFormDefinition) =>
  Object.entries(values)
    .map(([path, value]) => ({
      path,
      fieldType: getFieldType(path, searchFormDefinition),
      value
    }))
    .filter(({path, fieldType, value}) => value && (!Array.isArray(value) || value.length > 0))
    .map(({path, fieldType, value}) => tqlBuilder.getTql(path, value, fieldType))
    .filter(tql => tql.length > 0)

const getFieldType = (path, searchFormDefinition) => {
  const container = searchFormDefinition.children.find(child => child.children.length > 0)
  if (container) {
    const field = container.children.find(child => child.id === path)

    return field.children.length > 0 ? field.children[0].dataType : field.dataType
  }
}

InputEditSearch.propTypes = {
  form: PropTypes.object.isRequired,
  setSearchFields: PropTypes.func.isRequired
}

export default InputEditSearch
