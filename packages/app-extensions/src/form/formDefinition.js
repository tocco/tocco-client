import _pick from 'lodash/pick'
import _uniq from 'lodash/uniq'

import componentTypes from './enums/componentTypes'

export const getFieldId = (formName, fieldName) => `input-${formName}-${fieldName}`

export const getFieldDefinitions = (formDefinition, excludeHidden = true) => {
  return getFieldsOfChildren(formDefinition, excludeHidden)
}

const validFieldTypes = [componentTypes.FIELD, componentTypes.DISPLAY]

const getFieldsOfChildren = (definition, excludeHidden) => {
  const result = []

  for (let i = 0; i < definition.children.length; i++) {
    if (definition.children[i].children) {
      result.push(...getFieldsOfChildren(definition.children[i], excludeHidden))
    }

    const componentType = definition.children[i].componentType
    if (validFieldTypes.includes(componentType) && (!excludeHidden || definition.hidden !== true)) {
      result.push({
        ...definition.children[i],
        readonly: definition.readonly,
        ignoreCopy: definition.ignoreCopy
      })
    }
  }

  return result
}

export const getDefaultValues = fieldDefinitions =>
  fieldDefinitions
    .filter(f => f.defaultValue !== null && f.defaultValue !== undefined) // have to check both, values may be falsy
    .reduce(
      (valueObj, field) => ({
        ...valueObj,
        [field.path || field.id]: field.defaultValue
      }),
      {}
    )

/**
 * Mapping from entity fields to form fields per type.
 * Used for form values und form error mappings to handle virutal fields which only exists in forms.
 */
export const typeFieldMapping = {
  location: fieldDefinition => {
    const mapping = _pick(fieldDefinition.locationMapping, ['postcode', 'city'])
    return {
      mapping,
      paths: Object.values(mapping).filter(Boolean)
    }
  }
}

export const getUsedPaths = fieldDefinitions =>
  _uniq(
    fieldDefinitions
      .filter(field => field.componentType === componentTypes.FIELD)
      .reduce(
        (accumulator, field) => [
          ...accumulator,
          ...(typeFieldMapping[field.dataType]
            ? typeFieldMapping[field.dataType](field).paths
            : [field.path || field.id])
        ],
        []
      )
  )
