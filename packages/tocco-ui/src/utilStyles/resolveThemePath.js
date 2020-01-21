import _get from 'lodash/get'
import {ToccoTheme} from 'tocco-theme'

const getTheme = theme => Object.keys(theme).length === 0 ? ToccoTheme : theme

const color = path => ({theme}) => _get(getTheme(theme), `colors.${path}`)
const fontFamily = path => ({theme}) => _get(getTheme(theme), `fontFamily.${path}`)
const fontSize = path => ({theme}) => _get(getTheme(theme), `fontSize.${path}`)
const fontWeight = path => ({theme}) => _get(getTheme(theme), `fontWeights.${path}`)
const lineHeight = path => ({theme}) => _get(getTheme(theme), `lineHeights.${path}`)
const path = path => ({theme}) => _get(getTheme(theme), path)
const radii = path => ({theme}) => _get(getTheme(theme), `radii.${path}`)
const space = path => ({theme}) => _get(getTheme(theme), `space.${path}`)

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
