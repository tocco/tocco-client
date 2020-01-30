import _get from 'lodash/get'

export const searchFilterTransformer = json =>
  (json.data.map(e => ({key: e.key, uniqueId: _get(e, 'paths.unique_id.value', null)})))
