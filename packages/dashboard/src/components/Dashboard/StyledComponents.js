import styled from 'styled-components'
import {scale, StyledScrollbar, shadeColor, theme} from 'tocco-ui'
import _get from 'lodash/get'

export const StyledDashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${theme.color('paper')};
  padding: ${scale.space(-0.5)};
  overflow: auto;
  ${StyledScrollbar}
  box-sizing: border-box;
`

export const StyledColumnWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

export const StyledColumn = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
`

export const StyledInfoBoxWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: ${scale.space(-0.5)};
`

export const StyledResizeHandle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)};
  opacity: ${({isReszing}) => isReszing ? 1 : 0};
  height: 3px;
  cursor: row-resize;
`
