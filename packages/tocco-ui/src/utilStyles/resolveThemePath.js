import _get from 'lodash/get'

const color = (path, fallback = 'inherit') => ({theme}) => _get(theme, `colors.${path}`, fallback)
const fontFamily = (path, fallback = 'inherit') => ({theme}) => _get(theme, `fontFamily.${path}`, fallback)
const fontSize = (path, fallback = '1rem') => ({theme}) => _get(theme, `fontSize.${path}`, fallback)
const fontWeight = (path, fallback = 400) => ({theme}) => _get(theme, `fontWeights.${path}`, fallback)
const lineHeight = (path, fallback = 1) => ({theme}) => _get(theme, `lineHeights.${path}`, fallback)
const path = (path, fallback = 'inherit') => ({theme}) => _get(theme, path, fallback)
const radii = (path, fallback = 0) => ({theme}) => _get(theme, `radii.${path}`, fallback)
const space = (path, fallback = 2) => ({theme}) => _get(theme, `space.${path}`, fallback)

export default {
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  path,
  radii,
  space
}
