import _debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import SimpleFormApp from 'tocco-simple-form/src/main'
import {tqlBuilder} from 'tocco-util'

import {Box} from './StyledComponents'

const InputEditSearch = ({form, setSearchFields}) => {
  return form.children ? (
    <Box>
      <SimpleFormApp
        form={form}
        onChange={_debounce(handleChange(form, setSearchFields), 500)}
        noButtons={true}
        validate={false}
        mappingType="search"
        mode="search"
      />
    </Box>
  ) : null
}

const handleChange =
  (form, setSearchFields) =>
  ({values}) => {
    if (Object.keys(values).length > 0) {
      const tql = transformFormValuesToTql(values, form)
      setSearchFields(tql)
    } else {
      setSearchFields([])
    }
  }

const transformFormValuesToTql = (values, form) =>
  Object.entries(values)
    .map(([path, value]) => ({
      path,
      fieldType: getFieldType(path, form),
      value
    }))
    .filter(({path, fieldType, value}) => value && (!Array.isArray(value) || value.length > 0))
    .map(({path, fieldType, value}) => tqlBuilder.getTql(path, value, fieldType))
    .filter(tql => tql.length > 0)

const getFieldType = (path, form) => {
  const container = form.children.find(child => child.children.length > 0)
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
