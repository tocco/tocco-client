import {api} from 'tocco-util'

export const entitiesListTransformer = json => {
  return json.data.map(entity => api.getFlattenEntity(entity))
}
