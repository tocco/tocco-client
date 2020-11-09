import styled from 'styled-components'

const setColumnWidth = (containerWidth, maxCellsPerRow) => {
  const columns = containerWidth <= 300
    ? maxCellsPerRow.sm
    : containerWidth <= 600
      ? maxCellsPerRow.md
      : containerWidth <= 900
        ? maxCellsPerRow.lg
        : maxCellsPerRow.xl
  return `${100 / columns}%`
}

const declareStylesIfNestedCorrectly = ({
  isNestedCorrectly,
  containerWidth,
  maxCellsPerRow
}) => isNestedCorrectly ? `
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: ${setColumnWidth(containerWidth, maxCellsPerRow)};
    padding: 0 10px 10px 0;
    box-sizing: border-box;  // reset Tocco Framework
  ` : `
    &:not(:last-child) {
      padding: 0 0 10px 0;
    }
  `

const StyledLayoutBox = styled.div`
  && {
    max-width: 100%;
    ${props => declareStylesIfNestedCorrectly(props)}
  }
`

export default StyledLayoutBox
