import _get from 'lodash/get'

const multiRelationHandler = (value, lazyData) => {
  if (!value) {
    return value
  }

  return value.map(value => {
    const display = _get(lazyData, ['defaultDisplays', value.model, value.key], '')
    return {...value, display}
  })
}

const singleRelationHandler = (value, lazyData) => {
  if (!value) {
    return value
  }
  const display = _get(lazyData, ['defaultDisplays', value.model, value.key], '')
  return {...value, display}
}

const displayExpressionHandler = (value, lazyData, info) => {
  const result = _get(lazyData, ['displayExpressions', info.formName, info.key, info.path], '')
  return result
}

const typeHandlers = {
  'multi-select': multiRelationHandler,
  'multi-remote': multiRelationHandler,
  'single-select': singleRelationHandler,
  'remote': singleRelationHandler,
  'displayExpression': displayExpressionHandler
}

export const lazyValueEnhancer = (value, type, lazyData, info) => {
  const typeHandler = typeHandlers[type]

  if (!typeHandler) {
    return value
  }

  return typeHandler(value, lazyData, info)
}
