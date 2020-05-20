import React from 'react'
import SimpleFormApp from 'tocco-simple-form/src/main'
import _debounce from 'lodash/debounce'
import {tqlBuilder} from 'tocco-util'
import PropTypes from 'prop-types'

const InputEditSearch = ({form, model, setSearchFields}) => {
  return form.children && model.paths
    ? <SimpleFormApp
      form={form}
      model={model}
      onChange={_debounce(handleChange(form, setSearchFields), 500)}
      noButtons={true}
      validate={false}
      mappingType="search"
    />
    : null
}

const handleChange = (form, setSearchFields) => ({values, valid}) => {
  if (Object.keys(values).length > 0) {
    const tql = transformFormValuesToTql(values, form)
    setSearchFields(tql)
  }
}

const transformFormValuesToTql = (values, form) =>
  Object.entries(values)
    .map(([path, value]) => (
      {
        path,
        fieldType: getFieldType(path, form),
        value
      }
    ))
    .map(({path, fieldType, value}) => tqlBuilder.getTql(path, value, fieldType))

const getFieldType = (path, form) => {
  const container = form.children.find(child => child.children.length > 0)
  if (container) {
    const field = container.children.find(child => child.id === path)

    return field.children.length > 0 ? field.children[0].dataType : field.dataType
  }
}

InputEditSearch.propTypes = {
  form: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  setSearchFields: PropTypes.func.isRequired
}

export default InputEditSearch
