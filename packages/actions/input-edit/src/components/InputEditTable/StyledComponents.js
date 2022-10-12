import _get from 'lodash/get'
import {lighten} from 'polished'
import styled from 'styled-components'
import {scale, shadeColor, themeSelector, declareFont, declareFocus} from 'tocco-ui'

const borderColor = ({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)
const baseSpace = scale.space(-1)

export const StyledTable = styled.table`
  background-color: ${themeSelector.color('paper')};
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin-top: ${baseSpace};
  margin-bottom: ${baseSpace};
  table-layout: fixed;
  min-width: 900px;
`

export const StyledTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`

export const StyledCell = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  && {
    input,
    textarea,
    &.single-select > span > div {
      border: 1px solid ${borderColor};
      padding-left: ${baseSpace};

      &:not([disabled]):hover {
        cursor: pointer;
      }
      ${declareFocus}
    }

    &.single-select > span {
      display: inline-block;
      width: 100%;
      margin-left: 5px;
      margin-bottom: 5px;
      background-color: ${themeSelector.color('paper')};
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
  background-color: ${themeSelector.color('paper')};
  text-align: left;
  border-bottom: 2px solid ${borderColor};
  ${declareFont({fontWeight: themeSelector.fontWeight('bold')})};
  user-select: none;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({theme}) => lighten(0.25, theme.colors.secondaryLight)};
  }
`
