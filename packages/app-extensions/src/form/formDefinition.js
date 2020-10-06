import _uniq from 'lodash/uniq'

import componentTypes from './enums/componentTypes'
export const getFieldId = (formName, fieldName) => (
  `input-${formName}-${fieldName}`
)

export const getFieldDefinitions = formDefinition => {
  return getFieldsOfChildren(formDefinition)
}

const validFieldTypes = [
  componentTypes.FIELD,
  componentTypes.DISPLAY
]

const getFieldsOfChildren = definition => {
  const result = []

  for (let i = 0; i < definition.children.length; i++) {
    if (definition.children[i].children) {
      result.push(...getFieldsOfChildren(definition.children[i]))
    }

    const componentType = definition.children[i].componentType

    if (validFieldTypes.includes(componentType)) {
      result.push({
        ...definition.children[i],
        readonly: definition.readonly
      })
    }
  }

  return result
}

export const getDefaultValues = fieldDefinitions =>
  fieldDefinitions
    .filter(f => f.defaultValue)
    .reduce((valueObj, field) => ({
      ...valueObj,
      [field.id]: field.defaultValue
    }), {})

const typePathsHandlers = {
  location: fieldDefinition => Object.values(fieldDefinition.locationMapping).filter(v => v)
}

export const getUsedPaths = fieldDefinitions =>
  _uniq(
    fieldDefinitions
      .filter(field => field.componentType === componentTypes.FIELD)
      .reduce((accumulator, field) =>
        [
          ...accumulator,
          ...(typePathsHandlers[field.dataType] ? typePathsHandlers[field.dataType](field) : [field.path || field.id])
        ],
      [])
  )
