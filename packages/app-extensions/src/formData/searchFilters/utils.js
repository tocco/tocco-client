export const searchFilterResponseTransformer = searchFilterResponse =>
  searchFilterResponse.body.filters.map(f => ({uniqueId: f.uniqueId, display: f.label, key: f.key}))
