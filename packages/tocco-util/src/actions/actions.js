export const COMPONENT_TYPE_ACTION = 'action'
export const COMPONENT_TYPE_ACTION_GROUP = 'action-group'

export const isAction = componentType =>
  !!componentType && (componentType === COMPONENT_TYPE_ACTION_GROUP || componentType === COMPONENT_TYPE_ACTION)

export const modeFitsScopes = (mode, scopes) => (!mode || !scopes || scopes.length < 0 || scopes.includes(mode))
