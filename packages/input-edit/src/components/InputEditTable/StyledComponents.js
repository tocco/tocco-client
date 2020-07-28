import styled from 'styled-components'
import {scale, shadeColor, theme, declareFont, StyledScrollbar} from 'tocco-ui'
import {StyledEditableValue} from 'tocco-ui/src/EditableValue/StyledEditableValue'
import _get from 'lodash/get'
import {lighten} from 'polished'

export const StyledTable = styled.table`
  background-color: ${theme.color('paper')};
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin-top: ${scale.space(-1)};
  margin-bottom: ${scale.space(-1)};
`

export const StyledTableWrapper = styled.div`
  overflow: auto;
  ${StyledScrollbar}
`

export const StyledCell = styled.td`
  padding: ${scale.space(-1)};
  width: ${({width}) => width ? `${width}px` : 'auto'};
  border-bottom: 1px solid ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 2)};

  ${StyledEditableValue} {
    input {
      border: 1px solid transparent;
      padding-left: ${scale.space(-1)};
    }

    input:not([disabled]):hover {
      cursor: pointer;
      border-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 2)};
    }

    input:not([disabled]):focus {
      border-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 2)};
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
  padding: ${scale.space(-1)};
  background-color: ${theme.color('paper')};
  text-align: left;
  border-bottom: 2px solid ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 2)};
  ${declareFont({fontWeight: theme.fontWeight('bold')})};
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({theme}) => lighten(0.25, theme.colors.secondaryLight)};
  }
`
