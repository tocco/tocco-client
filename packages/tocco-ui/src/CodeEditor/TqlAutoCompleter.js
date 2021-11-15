import ace from 'ace-builds/src-min-noconflict/ace'
import {originId} from 'tocco-util'

import {functions, placeholders, types} from './TqlMode'

const TokenIterator = ace.require('ace/token_iterator').TokenIterator
const getTokenType = token => token ? token.type.substring(token.type.lastIndexOf('.') + 1) : null

const isCurrentTokenOfType = (iterator, type) => getTokenType(iterator.getCurrentToken()) === type

const findLastPathStep = iterator => {
  if (isCurrentTokenOfType(iterator, 'model')) {
    iterator.stepBackward()
  }
  if (isCurrentTokenOfType(iterator, 'field') || isCurrentTokenOfType(iterator, 'relation')) {
    iterator.stepBackward()
  }
  if (isCurrentTokenOfType(iterator, 'chaining')) {
    iterator.stepBackward()
  } else {
    return null
  }

  if (isCurrentTokenOfType(iterator, 'model')) {
    const modelToken = iterator.getCurrentToken()
    iterator.stepBackward()
    iterator.stepBackward()
    return modelToken ? modelToken.value.trim() : null
  } else {
    return null
  }
}

function stepBackUntilToken(iterator, type) {
  while (!isCurrentTokenOfType(iterator, type)) {
    if (!iterator.stepBackward()) {
      return false
    }
  }
  return true
}

const handleParentheses = (iterator, parenCount) => {
  if (isCurrentTokenOfType(iterator, 'rparen')) {
    return 1
  } else if (parenCount > 0 && isCurrentTokenOfType(iterator, 'lparen')) {
    iterator.stepBackward()
    return -1
  } else {
    return 0
  }
}

const findLastModelScope = iterator => {
  let parenCount = 0
  while (iterator.getCurrentToken()) {
    if (parenCount === 0 && isCurrentTokenOfType(iterator, 'where')) {
      const modelToken = iterator.stepBackward()
      return modelToken ? [modelToken.value.trim(), ...findCurrentPath(iterator)] : []
    }
    if (isCurrentTokenOfType(iterator, 'order_by')) {
      stepBackUntilToken(iterator, 'find')
      const modelToken = iterator.stepForward()
      return modelToken ? modelToken.value.trim() : []
    }
    parenCount += handleParentheses(iterator, parenCount)
    if (!iterator.stepBackward()) {
      return null
    }
  }
  return null
}

const backtrack = (iterator, stepBack) => {
  const steps = []
  let lastStep = stepBack(iterator)
  while (lastStep) {
    if (Array.isArray(lastStep)) {
      lastStep.forEach(step => steps.unshift(step))
    } else {
      steps.unshift(lastStep)
    }
    lastStep = stepBack(iterator)
  }
  return steps
}

export const findCurrentPath = iterator => backtrack(iterator, findLastPathStep)
export const findCurrentModelScope = iterator => backtrack(iterator, findLastModelScope)

/**
 * built-in language completions use 1000000, which also seems to just be some magic number
 * keyword and local completions seem to be somewhere around 100 based on some experiments with ordering
 **/
const defaultScore = 1000

const getFetchOptions = () => {
  const headers = new Headers()
  headers.set('X-Origin-Id', originId.getOriginId())
  return {
    headers,
    credentials: 'include'
  }
}

const sendRequest = endpoint => {
  return fetch(`${__BACKEND_URL__}/nice2/rest/${endpoint}`, getFetchOptions())
}

const extractBody = response => {
  if (response.status === 200) {
    return response.json()
  } else {
    return null
  }
}

const loadModels = () => {
  return sendRequest('entities').then(extractBody).then(body => body ? body.entities : [])
}

const buildRelationLabel = relation => {
  if (relation.relationName.substring(3) !== relation.targetEntity) {
    return `${relation.relationName} (${relation.targetEntity})`
  } else {
    return relation.relationName
  }
}

const resolvePath = path => {
  const [sourceModel, ...relationSteps] = path
  return sendRequest(`entities/${sourceModel}/model/resolve?path=${relationSteps.join('.')}`)
    .then(extractBody)
    .then(body => {
      if (!body) {
        return []
      }
      const fields = body.fields || []
      const relations = body.relations || []
      return [
        ...(fields.map(f => ({
          label: `${f.fieldName} (${f.type})`,
          value: f.fieldName,
          type: 'field'
        }))),
        ...(relations.map(r => ({
          label: buildRelationLabel(r),
          value: r.relationName,
          type: 'relation'
        })))
      ]
    })
}

const determineAvailablePaths = (createIterator, callback) => {
  const [baseModel, ...modelScope] = findCurrentModelScope(createIterator())
  if (!baseModel) {
    return
  }
  const currentPath = findCurrentPath(createIterator())
  const relationSteps = [...modelScope, ...currentPath].map(model => `rel${model}`)
  const fullPath = [baseModel, ...relationSteps]
  resolvePath(fullPath).then(paths => {
    const pathCompletions = paths.map(path => ({
      caption: path.label,
      value: path.value,
      meta: path.type,
      score: defaultScore
    }))
    callback(null, pathCompletions)
  })
}

const determineAllAvailableModels = callback =>
  loadModels().then(models => {
    const modelCompletions = models.map(model => ({
      caption: model,
      value: model,
      meta: 'model',
      score: defaultScore
    }))
    callback(null, modelCompletions)
  })

const getAvailableFunctions = () => functions.map(f => f.toUpperCase()).map(f =>
  ({
    caption: f,
    value: `${f}()`,
    meta: 'function',
    score: defaultScore - 30
  })
)

const getAvailableTypes = () => types.map(type =>
  ({
    caption: type,
    value: `${type}:`,
    meta: 'type',
    score: defaultScore - 20
  })
)

const getAvailablePlaceholders = () => placeholders.map(placeholder =>
  ({
    caption: placeholder,
    value: `:${placeholder}`,
    meta: 'placeholder',
    score: defaultScore - 10
  })
)

export default () => ({
  getCompletions: (editor, session, pos, prefix, callback) => {
    const createIteratorAtCurrentPosition = () => new TokenIterator(session, pos.row, pos.column)

    const currentToken = session.getTokenAt(pos.row, pos.column)
    switch (getTokenType(currentToken)) {
      case 'chaining':
      case 'relation':
      case 'separator':
      case 'order_by':
      case 'count':
      case 'exists':
      case 'field':
      case 'function_arguments':
        determineAvailablePaths(createIteratorAtCurrentPosition, callback)
        break
      case 'where':
      case 'conjunction':
        determineAvailablePaths(createIteratorAtCurrentPosition, callback)
        callback(null, getAvailableFunctions())
        break
      case 'nice_function':
        callback(null, getAvailableFunctions())
        break
      case 'find':
        determineAllAvailableModels(callback)
        break
      case 'type':
      case 'tocco_placeholder':
      case 'comparison':
        callback(null, getAvailableTypes())
        callback(null, getAvailablePlaceholders())
        break
      case 'model':
        determineAvailablePaths(createIteratorAtCurrentPosition, callback)
        determineAllAvailableModels(callback)
        break
    }
  }
})
