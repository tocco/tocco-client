export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))
