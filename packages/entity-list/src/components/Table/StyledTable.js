import styled, {css} from 'styled-components'
import {
  declareFont,
  theme,
  shadeColor,
  StyledScrollbar,
  scale
} from 'tocco-ui'
import _get from 'lodash/get'
import {lighten} from 'polished'

import {StyledResizeHandle} from './ResizingController'

export const StyledTableCell = styled.td`
  padding: ${scale.space(-1)};
  background-color: ${theme.color('paper')};
  border-bottom: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
`

export const StyledTableHeaderCell = styled.th`
  padding: ${scale.space(-1)};
  position: sticky;
  top: 0;
  background-color: ${theme.color('paper')};
  text-align: left;
  border-bottom: 2px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  ${declareFont({fontWeight: theme.fontWeight('bold')})};
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  ${props => props.isResizing && `
    background-color: ${lighten(0.25, props.theme.colors.secondaryLight)};

    > ${StyledResizeHandle} {
      opacity: 1;
    }
    `
  }
  ${props => !props.resizingColumn && `
    &:hover {
      background-color: ${lighten(0.25, props.theme.colors.secondaryLight)};

        > ${StyledResizeHandle} {
          opacity: 1;
        }
    }
    `
  }
`

export const PaginationContainer = styled.div`
  grid-row-start: pagination-start;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
`

const selectionStyles = css`
  display: contents;
  cursor: pointer;

  &.selected {
    > ${StyledTableCell} {
      background-color: ${props => lighten(0.1, props.theme.colors.secondaryLight)};
    }
  }

  &.selectableRow:not(.selected):hover {
    > ${StyledTableCell} {
      background-color: ${props => lighten(0.25, props.theme.colors.secondaryLight)};
    }
  }
`

export const StyledSortingSpan = styled.span`
  height: 100%;
  position: relative;
  left: 8px;
  top: 0;
  display: flex;
  align-items: center;
`

export const StyledFullRowProgress = styled.td`
  grid-column: 1 / -1;
  padding-top: ${scale.space(-1)};
  height: 50px;
  text-align: center;
  border: 0;
`

export const StyledFullRow = styled.td`
  grid-column: 1 / -1;
  padding-top: ${scale.space(-1)};
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
  grid-template-columns: ${props =>
  props.columns.map(column => column.width ? column.width + 'px' : 'minmax(50px, auto)').join(' ')};
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
  padding-left: ${scale.space(-0.5)};
  background-color: ${theme.color('paper')};
  grid-template-rows: [table-start] minmax(300px, 1fr) [pagination-start] auto auto;
  height: 100%;

  @media screen and (max-height: 650px) {
    grid-template-rows: [table-start] 1fr [pagination-start] auto auto;
  }
`

export const StyledDnD = styled.div`
  width: 100%;
  display: flex;
  border-right: ${props => props.isDraggedOver ? '3px solid ' + props.theme.colors.primary : 'none'};
  opacity: ${props => props.isDragged ? 0.2 : 1};
  pointer-events: ${props => props.isDraggedOver ? 'none' : 'auto'};
`

export default StyledTable
