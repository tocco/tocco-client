import styled from 'styled-components'
import {
  declareFont,
  theme,
  shadeColor,
  StyledScrollbar
} from 'tocco-ui'
import _get from 'lodash/get'
import {lighten} from 'polished'

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
    padding: 10px;
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .sorting{
      position: absolute;
      top: 0;
      right: 8px;
      bottom: 0;
    }

    .resizeHandle {
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

      > .resizeHandle {
        opacity: 1;
      }
    }
    ${props => {
      if (!props.resizingColumn) {
        return `
          &:hover {
            background-color: ${lighten(0.25, props.theme.colors.secondaryLight)};

            >.resizeHandle {
              opacity: 1;
            }
          }
        `
      }
    }}
    sup {
      padding-left: 1px;
      line-height: 0;

      &.up {
        vertical-align: super;
      }

      &.down {
        vertical-align: sub;
      }
    }
  }

  .fullRow {
    grid-column: 1 / -1;
    padding-top: 10px;
    height: 50px;
    text-align: center;
    border: 0;
  }

  .progress {
    ${declareFont()};
  }
`

export const PaginationContainer = styled.div`
  grid-row-start: pagination-start;
  height: 18px;
  border-top: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  padding-top: 5px;
  margin-right: 0;
`

export const StretchingTableContainer = styled.div`
  grid-row-start: table-start;
  position: relative;
`

export const StyledTableWrapper = styled.div`
  display: grid;
  padding: 10px;
  background-color: ${theme.color('paper')};
  grid-template-rows: [table-start] 1fr [pagination-start] auto auto;
  height: calc(100% - 18px);
`

export default StyledTable
