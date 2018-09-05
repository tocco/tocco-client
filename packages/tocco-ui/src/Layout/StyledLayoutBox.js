import styled from 'styled-components'
import {theme} from 'styled-system'

const setColumnWidth = (containerWidth, maxCellsPerRow) => {
  const columns = containerWidth <= 500
    ? maxCellsPerRow.sm
    : containerWidth <= 1000
      ? maxCellsPerRow.md
      : containerWidth <= 1500
        ? maxCellsPerRow.lg
        : maxCellsPerRow.xl
  return `${100 / columns}%`
}

const declareStylesIfNestedCorrectly = props => {
  if (props.isNestedCorrectly) {
    return `
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: ${setColumnWidth(props.containerWidth, props.maxCellsPerRow)};
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
