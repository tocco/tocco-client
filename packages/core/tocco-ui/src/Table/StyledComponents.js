import _get from 'lodash/get'
import {darken} from 'polished'
import styled, {css} from 'styled-components'

import {
  declareFont,
  themeSelector,
  shadeColor,
  StyledScrollbar,
  scale,
  StyledFontAwesomeAdapterWrapper,
  StyledBall
} from '../'
import {generateShades} from '../utilStyles'
import {ScrollBehaviour} from './scrollBehaviour'

const borderColor = ({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)
const basePadding = scale.space(-1.5)

export const StyledTableFooter = styled.div`
  grid-row-start: pagination-start;
  display: flex;
  align-items: flex-start;
  padding-top: ${scale.space(-0.5)};
  padding-bottom: ${scale.space(-1)};
  border-top: 1px solid ${borderColor};

  ${StyledBall} {
    margin-right: ${scale.space(-1)};
  }
`

export const StyledTableCell = styled.td`
  && {
    padding: ${basePadding};
    background-color: ${themeSelector.color('paper')};
    border-bottom: 1px solid ${borderColor};
    align-content: center;
    box-sizing: content-box;
    text-align: ${({column}) => (column?.rightAligned ? 'right' : 'left')};

    ${StyledFontAwesomeAdapterWrapper} {
      display: inline-block;
      margin-right: ${scale.space(-2)};
    }
  }
`

export const StyledDnD = styled.div`
  padding: ${basePadding};
  width: 100%;
  display: flex;
  align-items: center;
  opacity: ${({isDragged}) => (isDragged ? 0.2 : 1)};
`

export const StyledResizeHandle = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)};
  opacity: 0;
  width: 3px;
  cursor: col-resize;
`

export const StyledTableHeaderCell = styled.th`
  && {
    position: sticky;
    top: 0;
    background-color: ${themeSelector.color('paper')};
    text-align: ${({rightAligned}) => (rightAligned ? 'right' : 'left')};
    border-bottom: 2px solid ${borderColor};
    ${declareFont({fontWeight: themeSelector.fontWeight('bold')})};
    user-select: none;
    cursor: ${({isSortable}) => (isSortable ? 'pointer' : 'auto')};
    white-space: nowrap;
    display: flex;
    border-right: ${({isDraggedOver, theme}) => (isDraggedOver ? `3px solid ${theme.colors.text}` : 'none')};
    padding: 1px; /* default th padding */
    ${({id}) => id === 'header-cell-navigation-column' && 'z-index: 1'};
    ${({isResizingThisCell, theme}) =>
      isResizingThisCell &&
      `
    background-color: ${generateShades(theme.colors.paper)[1]};

    > ${StyledResizeHandle} {
      opacity: 1;
    }
  `}
    ${({isResizingAnyCell, theme}) =>
      !isResizingAnyCell &&
      `
    &:hover {
      background-color: ${generateShades(theme.colors.paper)[1]};

      > ${StyledResizeHandle} {
        opacity: 1;
      }
    }
  `}
    ${({isResizingThisCell, isSortable, fixedPosition, theme}) =>
      !isSortable
        ? `
    &:hover {
      background-color: ${theme.colors.paper};
    }
    `
        : !isResizingThisCell &&
          !isSortable &&
          !fixedPosition &&
          `
        &:hover {
          background-color: transparent;
        }
    `}
  }
`

const selectionStyles = css`
  display: contents;
  ${({clickable}) => clickable && 'cursor: pointer;'}

  &.selected {
    > ${StyledTableCell} {
      background-color: ${({theme}) => generateShades(theme.colors.paper)[2]};
    }
  }

  &.selectableRow:not(.selected):hover {
    > ${StyledTableCell} {
      background-color: ${({theme}) => generateShades(theme.colors.paper)[1]};
    }
  }
`

export const StyledSortingSpan = styled.span`
  height: 100%;
  margin-right: 2px;
`

export const StyledSortingRank = styled.span`
  position: relative;
  top: -0.5rem;
  font-weight: ${themeSelector.fontWeight('regular')};
`

export const StyledFullRowProgress = styled.td`
  && {
    grid-column: 1 / -1;
    padding-top: ${basePadding} 0 0 0;
    height: 50px;
    text-align: center;
    border: 0;
  }
`

export const StyledFullRow = styled.td`
  && {
    grid-column: 1 / -1;
    padding-top: ${basePadding} 0 0 0;
    height: 50px;
    text-align: center;
    border: 0;
    ${declareFont()};
  }
`

export const StyledTableHead = styled.thead`
  ${selectionStyles}
`

export const StyledTableRow = styled.tr`
  ${selectionStyles}

  &:nth-child(even) td {
    background-color: ${({theme}) => darken(0.05, theme.colors.paper)};
  }
`

export const StyledTableBody = styled.tbody`
  ${selectionStyles}
`

export const StyledTable = styled.table`
  overflow: auto;
  display: grid;
  border-collapse: collapse;
  grid-template-columns: ${({columns}) =>
    columns
      .map(column => {
        if (column.width) {
          return column.width + 'px'
        }
        return column.shrinkToContent ? 'max-content' : 'minmax(100px, auto)'
      })
      .join(' ')};
  grid-auto-rows: min-content;
  min-width: 100%;
  ${({scrollBehaviour}) =>
    scrollBehaviour === ScrollBehaviour.INLINE &&
    css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `}
  ${StyledScrollbar}
`

export const StretchingTableContainer = styled.div`
  grid-row-start: table-start;
  position: relative;
  overflow-x: auto;
`

export const StyledTableWrapper = styled.div`
  display: grid;
  background-color: ${themeSelector.color('paper')};
  grid-template-rows: [table-start] 1fr [pagination-start] auto auto;
  grid-template-columns: 100%;
  height: 100%;

  // reset external styles in old client
  input[type='checkbox'],
  input[type='radio'] {
    margin: 3px 3px 3px 4px !important;
    min-width: 12px;
  }
`

export const StyledDraggable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

export const StyledHeaderContentWrapper = styled.span`
  display: flex;
`

export const StyledHeaderContent = styled.div`
  width: 100%;
`
