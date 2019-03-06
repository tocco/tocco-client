import _get from 'lodash/get'

export const searchFilterTransformer = json =>
  (json.data.map(e => ({display: e.display, key: e.key, uniqueId: _get(e, 'paths.unique_id.value.value', null)})))
