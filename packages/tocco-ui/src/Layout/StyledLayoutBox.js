import styled from 'styled-components'

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
  return props.isNestedCorrectly ? `
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: ${setColumnWidth(props.containerWidth, props.maxCellsPerRow)};
    padding: 0 15px 20px 15px;
  ` : `
    &:not(:last-child) {
      padding: 0 0 20px 0;
    }
  `
}

const StyledLayoutBox = styled.div`
  ${props => declareStylesIfNestedCorrectly(props)}
`

export default StyledLayoutBox
