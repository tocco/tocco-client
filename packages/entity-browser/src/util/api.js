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

const pathMagic = columnDefinition => {
  return _union(...columnDefinition.map(field => (field.value))).join(',')
}

export function fetchRecords(entityName, page, orderBy, limit, searchTerm, columnDefinition) {
  const params = {
    '_sort': Object.keys(orderBy).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_limit': limit,
    '_offset': (page - 1) * limit,
    '_search': searchTerm,
    '_path': pathMagic(columnDefinition)
  }

  return fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
    .then(json => json.data.map(entity => {
      const result = {}
      const paths = entity.paths
      for (let path in paths) {
        const type = paths[path].type
        if (type === 'field') {
          result[path] = paths[path].value
        } else if (type === 'entity') {
          result[path] = {
            type: 'string',
            value: paths[path].value.display
          }
        }
      }

      return result
    }))
}

export function fetchRecordCount(entityName) {
  return fetchRequest(`entities/${entityName}/count`)
    .then(resp => resp.json())
    .then(json => json.count)
}

export function fetchForm(formName, formType) {
  return fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => {
      const {form} = json
      return form.children.find(child => child.name === formType)
    })
}

export function fetchSearchForm(formName) {
  return fetchRequest(`forms/${formName}`)
    .then(resp => resp.json())
    .then(json => {
      const {form} = json
      return form.children[0].children
    })
}

