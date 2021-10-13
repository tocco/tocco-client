import styled, {css} from 'styled-components'
import _get from 'lodash/get'
import {darken} from 'polished'

import {
  declareFont,
  theme,
  shadeColor,
  StyledScrollbar,
  scale
} from '../'
import {StyledResizeHandle} from './ResizingController'
import {generateShades} from '../utilStyles'

const borderColor = ({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)
const basePadding = scale.space(-1.5)

export const StyledTableCell = styled.td`
  padding: ${basePadding};
  background-color: ${theme.color('paper')};
  border-bottom: 1px solid ${borderColor};
  align-content: center;
  box-sizing: content-box;
`

export const StyledDnD = styled.div`
  padding: ${basePadding};
  width: 100%;
  display: flex;
  align-items: center;
  opacity: ${({isDragged}) => isDragged ? 0.2 : 1};
`

export const StyledTableHeaderCell = styled.th`
  position: sticky;
  top: 0;
  background-color: ${theme.color('paper')};
  text-align: left;
  border-bottom: 2px solid ${borderColor};
  ${declareFont({fontWeight: theme.fontWeight('bold')})};
  user-select: none;
  cursor: ${({sortable}) => sortable ? 'pointer' : 'auto'};
  white-space: nowrap;
  display: flex;
  border-right: ${({isDraggedOver, theme}) => isDraggedOver ? `3px solid ${theme.colors.text}` : 'none'};
  ${({id}) => id === 'header-cell-navigation-column' && 'z-index: 1'};
  ${({isResizing, theme}) => isResizing && `
    background-color: ${generateShades(theme.colors.paper)[1]};

    > ${StyledResizeHandle} {
      opacity: 1;
    }
  `
  }
  ${({resizingColumn, theme}) => !resizingColumn && `
    &:hover {
      background-color: ${generateShades(theme.colors.paper)[1]};

      > ${StyledResizeHandle} {
        opacity: 1;
      }
    }
  `
  }
  ${({isResizing, sortable, fixedPosition, theme}) => !sortable
    ? `
    &:hover {
      background-color: ${theme.colors.paper};
    }
    `
    : !isResizing && !sortable && !fixedPosition && `
        &:hover {
          background-color: transparent;
        }
    `
  }
`

export const PaginationContainer = styled.div`
  grid-row-start: pagination-start;
  height: 40px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${borderColor};
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

export const StyledFullRowProgress = styled.td`
  grid-column: 1 / -1;
  padding-top: ${basePadding};
  height: 50px;
  text-align: center;
  border: 0;
`

export const StyledFullRow = styled.td`
  grid-column: 1 / -1;
  padding-top: ${basePadding};
  height: 50px;
  text-align: center;
  border: 0;
  ${declareFont()};
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

const StyledTable = styled.table`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: grid;
  border-collapse: collapse;
  grid-template-columns: ${({columns}) =>
  columns.map(column =>
    column.width
      ? column.width + 'px'
      : column.shrinkToContent
        ? 'max-content'
        : 'minmax(100px, auto)'
  ).join(' ')};
  grid-auto-rows: min-content;
  min-width: 100%;
  ${StyledScrollbar}
`

export const StretchingTableContainer = styled.div`
  grid-row-start: table-start;
  position: relative;
`

export const StyledTableWrapper = styled.div`
  display: grid;
  background-color: ${theme.color('paper')};
  grid-template-rows: [table-start] 1fr [pagination-start] auto auto;
  height: 100%;

  // reset external styles in old client
  input[type='checkbox'],
  input[type='radio'] {
    margin: 3px 3px 3px 4px !important;
  }

  @media screen and (max-height: 650px) {
    grid-template-rows: [table-start] 1fr [pagination-start] auto auto;
  }
`

export const StyledDraggable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

export default StyledTable
