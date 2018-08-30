import styled from 'styled-components'
import {theme} from 'styled-system'

const declareBreakpoints = props => {
  if (props.containerWidth <= 500) {
    return `${100 / props.maxCellsPerRow.sm}%`
  } else if (props.containerWidth <= 1000) {
    return `${100 / props.maxCellsPerRow.md}%`
  } else if (props.containerWidth <= 1500) {
    return `${100 / props.maxCellsPerRow.lg}%`
  } else {
    return `${100 / props.maxCellsPerRow.xl}%`
  }
}

const declareStylesIfNestedCorrectly = props => {
  if (props.isNestedCorrectly) {
    return `
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: ${declareBreakpoints(props)};
      padding: 0 ${theme('space.4')(props)} ${theme('space.5')} ${theme('space.4')(props)};
      padding: 0 15px 20px 15px;
    `
  } else {
    return `
      &:not(:last-child) {
        padding: 0 0 20px 0;
      }
    `
  }
}

const StyledLayoutBox = styled.div`
  ${props => declareStylesIfNestedCorrectly(props)}
`

export default StyledLayoutBox
