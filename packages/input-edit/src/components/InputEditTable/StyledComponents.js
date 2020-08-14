import styled from 'styled-components'
import {scale, shadeColor, theme, declareFont, StyledScrollbar} from 'tocco-ui'
import _get from 'lodash/get'
import {lighten} from 'polished'

const borderColor = ({theme}) => shadeColor(_get(theme, 'colors.paper'), 2)
const baseSpace = scale.space(-1)

export const StyledTable = styled.table`
  background-color: ${theme.color('paper')};
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin-top: ${baseSpace};
  margin-bottom: ${baseSpace};
  table-layout: fixed;
  min-width: 900px;
`

export const StyledTableWrapper = styled.div`
  overflow: auto;
  ${StyledScrollbar}
`

export const StyledCell = styled.td`
  padding: ${scale.space(-1)};
  width: ${({width}) => width ? `${width}px` : 'auto'};
  border-bottom: 1px solid ${borderColor};

  && {
    input,
    textarea,
    &.single-select > span > div {
      border: 1px solid transparent;
      padding-left: ${baseSpace};

      &:not([disabled]):hover {
        cursor: pointer;
        border-color: ${borderColor};
      }

      &:not([disabled]):focus {
        border-color: ${borderColor};
      }
    }

    &.single-select > span {
      display: inline-block;
      width: 100%;
      margin-left: 5px;
      margin-bottom: 5px;
      background-color: ${theme.color('paper')};
    }

    &.single-select button {
      margin-bottom: 2px;
      margin-right: 2px;
    }
  }
`

export const StyledTableRow = styled.tr`
  &:hover {
    ${StyledCell} {
      background-color: ${({theme}) => lighten(0.25, theme.colors.secondaryLight)};
    }
  }
`

export const StyledHeader = styled.th`
  padding: ${baseSpace};
  background-color: ${theme.color('paper')};
  text-align: left;
  border-bottom: 2px solid ${borderColor};
  ${declareFont({fontWeight: theme.fontWeight('bold')})};
  user-select: none;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({theme}) => lighten(0.25, theme.colors.secondaryLight)};
  }
`
