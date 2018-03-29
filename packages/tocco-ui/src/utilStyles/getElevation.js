import {theme} from 'styled-system'

const getElevation = (props, elevation) => {
  return `box-shadow: ${theme(`shadows.levels.${elevation}`)(props)} ${theme('shadows.color')(props)};`
}

export default getElevation
