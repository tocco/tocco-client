import _reduce from 'lodash/reduce'
import {api} from 'tocco-util'

export const entitiesListTransformer = json => (
  json.data.map(entity => (
    {
      __key: entity.key,
      __model: entity.model,
      ...(_reduce(
        entity.paths,
        (acc, value, key) => ({...acc, [key]: api.typeValueExtractor[value.type](value.value)}),
        {}
      ))
    }
  ))
)
