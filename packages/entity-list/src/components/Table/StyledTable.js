import styled from 'styled-components'
import {
  declareFont,
  theme,
  shadeColor,
  StyledScrollbar,
  scale
} from 'tocco-ui'
import _get from 'lodash/get'
import {lighten} from 'polished'
import {StyledPagination} from 'tocco-ui/src/Pagination/Pagination'

import {StyledResizeHandle} from './ResizingController'

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
  ${StyledFullRowProgress}
  ${declareFont()};
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
  props.columns.map(column => column.width ? column.width + 'px' : 'minmax(90px, auto)').join(' ')};
  grid-auto-rows: min-content;
  min-width: 100%;
  ${StyledScrollbar}

  th,
  td {
    padding: ${scale.space(-1)};
  }

  td {
    background-color: ${theme.color('paper')};
    border-bottom: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  }

  thead,
  tbody,
  tr {
    display: contents;
    cursor: pointer;

    &.selected {
      > td {
        background-color: ${props => lighten(0.1, props.theme.colors.secondaryLight)};
      }
    }

    &.selectableRow:not(.selected):hover {
      > td {
        background-color: ${props => lighten(0.25, props.theme.colors.secondaryLight)};
      }
    }
  }

  th {
    position: sticky;
    top: 0;
    background-color: ${theme.color('paper')};
    text-align: left;
    border-bottom: 2px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
    ${declareFont({fontWeight: theme.fontWeight('bold')})};
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;

    &:nth-child(1),
    &:nth-child(2) {
      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }

    ${StyledResizeHandle} {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background: ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
      opacity: 0;
      width: 3px;
      cursor: col-resize;
    }

    &[id='${props => props.resizingColumn && props.resizingColumn.id}'] {
      background-color: ${props => lighten(0.25, props.theme.colors.secondaryLight)};

      > ${StyledResizeHandle} {
        opacity: 1;
      }
    }
    ${props => {
      if (!props.resizingColumn) {
        return `
          &:hover {
            background-color: ${lighten(0.25, props.theme.colors.secondaryLight)};

              > ${StyledResizeHandle} {
                opacity: 1;
              }
          }
        `
      }
    }}
  }
`

export const PaginationContainer = styled.div`
  grid-row-start: pagination-start;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};

  ${StyledPagination} {
    margin-top: ${scale.space(0)};
  }
`

export const StretchingTableContainer = styled.div`
  grid-row-start: table-start;
  position: relative;
`

export const StyledTableWrapper = styled.div`
  display: grid;
  padding: ${scale.space(-0.5)};
  background-color: ${theme.color('paper')};
  grid-template-rows: [table-start] 1fr [pagination-start] auto auto;
  height: calc(100% - 2 * ${scale.space(-0.5)});
`

export default StyledTable
