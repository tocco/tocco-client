import componentTypes from './componentTypes'

export const isAction = componentType => !!componentType && Object.values(componentTypes).indexOf(componentType) >= 0

export const modeFitsScopes = (mode, scopes) => (!mode || !scopes || scopes.length < 0 || scopes.includes(mode))
