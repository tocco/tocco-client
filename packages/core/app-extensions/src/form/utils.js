import _pick from 'lodash/pick'

import {isAction} from '../actions/actions'

export const getFormFieldDefinition = fieldDefinition => {
  const formFieldDefinition = fieldDefinition.children.find(child => !isAction(child.componentType))
  if (!formFieldDefinition) {
    return null
  }

  return {
    ...formFieldDefinition,
    ..._pick(fieldDefinition, ['label', 'hidden', 'readonly', 'scopes'])
  }
}

export const hasError = errors => Boolean(errors) && Object.keys(errors).length > 0
