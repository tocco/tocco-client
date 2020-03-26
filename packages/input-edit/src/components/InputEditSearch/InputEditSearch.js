import React from 'react'
import SimpleFormApp from 'tocco-simple-form/src/main'
import _debounce from 'lodash/debounce'
import {tqlBuilder} from 'tocco-util'
import PropTypes from 'prop-types'

const InputEditSearch = ({form, model, setSearchFields}) => {
  if (form.children && model.paths) {
    return <SimpleFormApp form={form}
      model={model}
      onChange={_debounce(handleChange(form, setSearchFields), 500)}
      noButtons={true}/>
  } else {
    return null
  }
}

const handleChange = (form, setSearchFields) => ({values, valid}) => {
  if (valid && Object.keys(values).length > 0) {
    const tql = Object.entries(values)
      .map(([path, value]) => {
        const parsedPath = path.replace('--', '.')
        return {
          path: parsedPath,
          fieldType: loadFieldType(parsedPath, form),
          value: value
        }
      })
      .map(({path, fieldType, value}) => tqlBuilder.getTql(path, value, fieldType))
    setSearchFields(tql)
  }
}

const loadFieldType = (path, form) => {
  const container = form.children.find(child => child.children.length > 0)
  if (container) {
    const field = container.children.find(child => child.id === path)
    return field.dataType
  }
}

InputEditSearch.propTypes = {
  form: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  setSearchFields: PropTypes.func.isRequired
}

export default InputEditSearch
