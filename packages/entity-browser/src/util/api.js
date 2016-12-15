import _union from 'lodash/union'

export const getParameterString = params => {
  const paramString = Object.keys(params || [])
    .filter(k => !!params[k])
    .sort()
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&')
  if (paramString) {
    return `?${paramString}`
  }
  return ''
}

const fetchRequest = (resource, params) => {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }

  const paramString = getParameterString(params)

  return fetch(`${__BACKEND_URL__}/nice2/rest/${resource}${paramString}`, options)
}

const getPathsValue = columnDefinition => {
  return _union(...columnDefinition.map(field => (field.value))).join(',')
}

export function fetchRecords(entityName, page, orderBy, limit, searchTerm, columnDefinition) {
  const params = {
    '_sort': Object.keys(orderBy).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_limit': limit,
    '_offset': (page - 1) * limit,
    '_search': searchTerm,
    '_paths': getPathsValue(columnDefinition)
  }

  return fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
    .then(json => transformRecordsResult(json))
}

const transformRecordsResult = json => {
  return json.data.map(entity => {
    const result = {}
    const paths = entity.paths
    for (let path in paths) {
      const type = paths[path].type
      if (type === 'field') {
        result[path] = paths[path].value
      } else if (type === 'entity') {
        result[path] = {
          type: 'string',
          value: paths[path].value ? paths[path].value.display : ''
        }
      } else if (type === 'entity-list') {
        result[path] = {
          type: 'string',
          value: paths[path].value ? paths[path].value.map(v => v.display).join(', ') : ''
        }
      }
    }
    return result
  })
}

export function fetchRecordCount(entityName, searchTerm) {
  const params = {
    '_search': searchTerm
  }
  return fetchRequest(`entities/${entityName}/count`, params)
    .then(resp => resp.json())
    .then(json => json.count)
}

export function fetchColumnDefinition(formName, formType) {
  return fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => transformFormResult(json, formType))
}

const transformFormResult = (json, formType) => {
  const {form} = json

  const columns = form.children.find(child => child.name === formType)
    .children.filter(column => column.displayType !== 'HIDDEN')

  return columns.map(c => ({
    label: c.label,
    value: c.children
      .filter(child =>
      child.type !== 'ch.tocco.nice2.model.form.components.action.Action'
      && !child.name.startsWith('custom:'))
      .map(child => child.name)
  }))
}

export function fetchSearchForm(formName) {
  return fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => transformSearchFormResult(json))
}

const transformSearchFormResult = json => {
  const {form} = json
  return form.children[0].children.map(f => ({
    name: f.name,
    type: f.type,
    displayType: f.displayType,
    label: f.label,
    useLabel: f.useLabel
  }))
}

